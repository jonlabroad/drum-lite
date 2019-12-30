import BaseEffectConfig from "../effects/BaseEffectConfig"
import CompiledEffect from "./CompiledEffect";
import PartialEffect from "../light/effect/PartialEffect";
import EffectCombiner from "./EffectCombiner";

export default class EffectCompiler {
    config: BaseEffectConfig;
    timestepMillis: number;
    
    constructor(config: BaseEffectConfig) {
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
        const compiled: CompiledEffect[][] = [[], []];
        for (let configEffect of this.config.effects) {
            const compiledEffectElements: CompiledEffect[] = [];
            const allEffects = configEffect.map(ce => {return {effects: ce.getEffects(), config: ce}});
            allEffects.forEach(effectGroup => {
                effectGroup.effects.forEach(effects => {
                    let dt = 0;
                    while (!this.effectsAreComplete(effects, dt)) {
                        const combinedEffectElements = new EffectCombiner(effects).combine(dt);
                        combinedEffectElements.forEach(combinedEffectElement => {
                            const compiledEffectElement = new CompiledEffect(
                                effectGroup.config.triggerEvents,
                                combinedEffectElement,
                                dt,
                                this.timestepMillis,
                                effectGroup.config.priority,
                                effectGroup.config.isAmbient,
                                effectGroup.config.isModifier);
                            compiledEffectElements.push(compiledEffectElement);
                        })
                        dt = dt + this.timestepMillis;
                    }

                    if (effectGroup.config.isAmbient) {
                        const ambientDuration = dt - this.timestepMillis;
                        for (let el of compiledEffectElements) {
                            el.ambientDuration = ambientDuration;
                        }
                    }
                    compiled.push(compiledEffectElements);
                });
            });
        }

        return compiled
    }
}
