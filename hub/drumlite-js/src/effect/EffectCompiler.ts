
import CompiledEffect from "./CompiledEffect";
import PartialEffect from "../light/effect/PartialEffect";
import EffectCombiner from "./EffectCombiner";
import FullEffectConfig from "../effects/FullEffectConfig";
import EffectConfig from "../effects/EffectConfig";
import { EffectPriority } from "./EffectPriority";
import { HitType } from "../midi/HitType";

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

    public compile() {
        const compiled: CompiledEffect[] = [];
        for (let configEffect of this.config.effects) {
            this.compileEffect(configEffect, compiled);
        }

        return compiled
    }

    public compileEffect(effectConfig: EffectConfig<any>, compiled: CompiledEffect[])  {
        const newCompiled: CompiledEffect[] = [];
        if (effectConfig.effect && effectConfig.effect.partialEffects.length > 0) {
            const partialEffects = effectConfig.effect.partialEffects;
            let dt = 0;
            const isAmbient: boolean = effectConfig.params.params['isAmbient'] ? effectConfig.params.params['isAmbient'].val : false;
            const priority: EffectPriority = effectConfig.params.params['priority'] ? effectConfig.params.params['priority'].val : EffectPriority.MEDIUM;
            const modifier: boolean = effectConfig.params.params['isModifier'] ? effectConfig.params.params['isModifier'].val : false;
            const triggerEffects: HitType[] = effectConfig.params.params['triggers'] ? effectConfig.params.params['triggers'].val : [];
            while (!!partialEffects.find(pe => pe.isTemporal() && !pe.isComplete(dt))) {
                const combinedEffects = new EffectCombiner(partialEffects).combine(dt);
                combinedEffects.forEach(combinedEffect => {
                    const compiledEffect = new CompiledEffect(
                        triggerEffects,
                        combinedEffect,
                        dt,
                        this.timestepMillis,
                        priority,
                        isAmbient,
                        modifier
                    );

                    newCompiled.push(compiledEffect);
                });
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
        
        if (effectConfig.children) {
            effectConfig.children.forEach(child => this.compileEffect(child, compiled));
        }
    }
}
