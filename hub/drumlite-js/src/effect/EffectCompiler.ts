
import CompiledEffect from "./CompiledEffect";
import PartialEffect from "../light/effect/PartialEffect";
import EffectCombiner from "./EffectCombiner";
import FullEffectConfig from "../effects/FullEffectConfig";
import EffectConfig from "../effects/EffectConfig";
import { EffectPriority } from "./EffectPriority";
import { HitType } from "../midi/HitType";
import MidiDrumNote from "../midi/MidiDrumNote";

export default class EffectCompiler {
    config: FullEffectConfig;
    timestepMillis: number;
    
    constructor(config: FullEffectConfig) {
        this.timestepMillis = 50;
        this.config = config
    }

    public effectsAreComplete(effects: PartialEffect<any>[], dt: number) {
        for (let effect of effects) {
            if (effect.isTemporal() && !effect.isComplete(dt)) {
                return false;
            }
        }
        return true;
    }

    public compile(note?: MidiDrumNote) {
        const compiled: CompiledEffect[] = [];
        for (let configEffect of this.config.effects) {
            this.compileEffect(configEffect, compiled, note);
        }

        return compiled
    }

    public compileEffect(effectConfig: EffectConfig<any>, compiled: CompiledEffect[], note?: MidiDrumNote)  {
        const newCompiled: CompiledEffect[] = [];
        if (effectConfig.effect && effectConfig.effect.partialEffects.length > 0) {
            const partialEffects = effectConfig.effect.partialEffects;
            let dt = 0;
            const isAmbient: boolean = effectConfig.params.params['isAmbient'] ? effectConfig.params.params['isAmbient'].val : false;
            const isJit: boolean = effectConfig.params.params['isJit'] ? effectConfig.params.params['isJit'].val : false;
            if (!isJit) {
                while (!!partialEffects.find(pe => pe.isTemporal() && !pe.isComplete(dt))) {
                    newCompiled.push(...EffectCompiler.compileEffectTimestep(effectConfig, dt, this.timestepMillis, isJit, note).compiled);
                    dt = dt + this.timestepMillis;
                }

                const ambientDuration = dt - this.timestepMillis;
                newCompiled.forEach(c => {
                    if (isAmbient) {
                        c.ambientDuration = ambientDuration;
                    }
                });
                compiled.push(...newCompiled);
            }
        }
        
        if (effectConfig.children) {
            effectConfig.children.forEach(child => this.compileEffect(child, compiled, note));
        }
    }

    public static compileEffectTimestep(effectConfig: EffectConfig<any>, t: number, timestepMillis: number, isJit = false, note?: MidiDrumNote): {
        compiled: CompiledEffect[],
        completed: boolean
     } {
        const isAmbient: boolean = effectConfig.params.params['isAmbient'] ? effectConfig.params.params['isAmbient'].val : false;
        const priority: EffectPriority = effectConfig.params.params['priority'] ? effectConfig.params.params['priority'].val : EffectPriority.MEDIUM;
        const modifier: boolean = effectConfig.params.params['isModifier'] ? effectConfig.params.params['isModifier'].val : false;
        const triggerEffects: HitType[] = effectConfig.params.params['triggers'] ? effectConfig.params.params['triggers'].val : [];
        
        const compiled: CompiledEffect[] = [];
        const partialEffects = effectConfig.effect?.partialEffects;
        let isComplete = true;
        if (partialEffects) {
            const compiledEffects = this.compilePartialEffects(partialEffects, t, timestepMillis, triggerEffects, priority, isAmbient, modifier, note);
            compiled.push(...compiledEffects.compiled);
            isComplete = isComplete && compiledEffects.isComplete;
        }

        if (isJit && effectConfig.children) {
            effectConfig.children.forEach(child => {
                const compiledEffect = this.compileEffectTimestep(child, t, timestepMillis, isJit, note);
                isComplete = isComplete && compiledEffect.completed;
                compiledEffect.compiled.forEach(c => c.t = c.dt);
                if (!isComplete) {
                    compiled.push(...compiledEffect.compiled);
                }
            });
        }

        return {
            compiled,
            completed: isComplete
        }
    }

    public static compilePartialEffects(
        partialEffects: PartialEffect<any>[],
        t: number,
        timestepMillis: number,
        triggerEffects: HitType[],
        priority: EffectPriority,
        isAmbient: boolean,
        modifier: boolean,
        note?: MidiDrumNote
    ): {
        compiled: CompiledEffect[],
        isComplete: boolean
    }{
        const compiled: CompiledEffect[] = [];
        const combinedEffects = new EffectCombiner(partialEffects).combine(t, note);
        combinedEffects.forEach(combinedEffect => {
            const compiledEffect = new CompiledEffect(
                triggerEffects,
                combinedEffect,
                t,
                timestepMillis,
                priority,
                isAmbient,
                modifier,
                note ? note.time.getTime() : t
            );

            compiled.push(compiledEffect);
        });

        const isComplete = !partialEffects.find(pe => isAmbient || (pe.isTemporal() && !pe.isComplete(t, note)));
        return {
            compiled,
            isComplete
        };
    }
}
