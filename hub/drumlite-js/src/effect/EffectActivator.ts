import { HitType } from "../midi/HitType";
import CompiledEffect from "./CompiledEffect";
import FullEffectConfig from "../effects/FullEffectConfig";
import EffectCombiner from "./EffectCombiner";
import EffectCompiler from "./EffectCompiler";
import MidiDrumNote from "../midi/MidiDrumNote";
import EffectConfig from "../effects/EffectConfig";
import PartialEffect from "../light/effect/PartialEffect";

export default class EffectActivator {
    timestepMillis: number;

    compiledEffects: CompiledEffect[] = [];
    activeEffects: CompiledEffect[] = [];
    ambientEffects: CompiledEffect[] = [];
    jitEffects: EffectConfig<any>[] = [];
    triggeredJitEffects: {
        effect: EffectConfig<any>,
        note: MidiDrumNote
    }[] = [];

    constructor(compiledEffects: CompiledEffect[], jitEffects: FullEffectConfig[], timestep: number) {
        this.timestepMillis = timestep;
        this.jitEffects = jitEffects.map(e => e.effects).flat();
        this.setEffects(compiledEffects);
    }

    public handleNote(note: MidiDrumNote) {
        const noteTime = new Date();
        const effects = this.findNewEffects(note.note);
        this.triggeredJitEffects.push(
            ...this.getTriggeredJitConfigs(note, this.timestepMillis).map(ef => ({
                effect: ef,
                note: note
            }))
        );

        for (let effectElement of effects) {
            effectElement = Object.assign({}, effectElement);
            effectElement.t = noteTime.getTime() + effectElement.dt;
            effectElement.noteTime = noteTime.getTime();
            this.activeEffects.push(effectElement);
        }
    }

    public setEffects(compiledEffects: CompiledEffect[]) {
        this.compiledEffects = compiledEffects;
        this.activeEffects = []

        this.ambientEffects = this.compiledEffects.filter(e => e && e.isAmbient, compiledEffects);
        for (let el of this.ambientEffects) {
            const effectElement = Object.assign({}, el);
            effectElement.t = effectElement.dt;
            effectElement.noteTime = 0;

            this.activeEffects.push(effectElement);
        }
    }

    public getCurrentActiveEffects() {
        const t = new Date().getTime();
        const currentActive =  this.activeEffects.filter(e => this.filterActiveEffects(e, t));
        this.activeEffects = this.activeEffects.filter(e => e.isAmbient || e.t + e.duration >= t);//, this.activeEffects);

        currentActive.push(...this.findNewJitEffects(undefined, t));

        // Get any triggered effects
        const newTriggeredJitEffects: {
            effect: EffectConfig<any>,
            note: MidiDrumNote
         }[] = [];
        this.triggeredJitEffects.forEach(ec => {
            const compiled = EffectCompiler.compileEffectTimestep(ec.effect, t, this.timestepMillis, true, ec.note);
            currentActive.push(...compiled.compiled);
            if (!compiled.completed) {
                newTriggeredJitEffects.push({
                    effect: ec.effect,
                    note: ec.note,
                });
            }
        });

        this.triggeredJitEffects = newTriggeredJitEffects;

        return currentActive
    }

    public getActiveEffects() {
        return this.activeEffects;
    }

    public findNewEffects(hitType: HitType) {
        const effects = this.compiledEffects.filter(e => e && e.hitTypes.find(h => h === hitType), this.compiledEffects);
        return effects
    }

    public getTriggeredJitConfigs(note: MidiDrumNote | undefined, t: number): EffectConfig<any>[] {
        const triggered: EffectConfig<any>[] = [];
        const selectedEffects = this.jitEffects.filter(effect => this.isJit(effect) && this.isTriggered(effect, note));
        triggered.push(...selectedEffects);
        return triggered;
    }

    public findNewJitEffects(note: MidiDrumNote | undefined, t: number): CompiledEffect[] {
        // TODO filter by hittype if necessary?
        const effects: CompiledEffect[] = [];
        this.jitEffects.filter(effect => {
            return this.isJit(effect) && (this.isJitAmbient(effect) || this.isTriggered(effect, note));
        }).forEach(effect => {
            effects.push(...EffectCompiler.compileEffectTimestep(effect, t, this.timestepMillis, true, note).compiled);
        });
        return effects;
    }

    public removeActiveEffectsForTarget(hitType: HitType) {
        this.activeEffects = this.activeEffects.filter(e => !(e.hitTypes.find(h => h === hitType)), this.activeEffects);
    }

    private filterActiveEffects(e: CompiledEffect, t: number) {
        return (!e.isAmbient && e.t <= t && e.t + e.duration > t) || (e.isAmbient && t % e.ambientDuration >= e.t && t % e.ambientDuration < (e.t + e.duration));
    }

    private isJit(e: EffectConfig<any>) {
        return e.params.params.isJit.val;
    }

    private isTriggered(e: EffectConfig<any>, note: MidiDrumNote | undefined) {
        return (note !== undefined && e.params.params.triggers.val.includes(note.note));
    }

    private isJitAmbient(e: EffectConfig<any>) {
        return e.params.params.isAmbient.val;
    }
}