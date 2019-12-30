import { HitType } from "../midi/HitType";
import CompiledEffect from "./CompiledEffect";

export default class EffectActivator {
    compiledEffects: CompiledEffect[] = [];
    activeEffects: CompiledEffect[] = [];
    ambientEffects: CompiledEffect[] = [];

    constructor(compiledEffects: CompiledEffect[]) {
        this.setEffects(compiledEffects);
    }

    public handleNote(hitType: HitType) {
        const noteTime = new Date();
        const effects = this.findNewEffects(hitType);
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
        const currentActive =  this.activeEffects.filter(e => (!e.isAmbient && e.t < t && e.t + e.duration > t) || (e.isAmbient && t % e.ambientDuration >= e.t && t % e.ambientDuration < (e.t + e.duration)))
        this.activeEffects = this.activeEffects.filter(e => e.isAmbient || e.t + e.duration >= t, this.activeEffects);
        return currentActive
    }

    public getActiveEffects() {
        return this.activeEffects;
    }

    public findNewEffects(hitType: HitType) {
        const effects = this.compiledEffects.filter(e => e && e.hitTypes.find(h => h === hitType), this.compiledEffects);
        return effects
    }

    public removeActiveEffectsForTarget(hitType: HitType) {
        this.activeEffects = this.activeEffects.filter(e => !(e.hitTypes.find(h => h === hitType)), this.activeEffects);
    }
}