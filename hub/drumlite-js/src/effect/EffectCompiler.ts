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

    public effectsAreComplete(effects: PartialEffect[], dt: number) {
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
            let dt = 0;
            const compiledEffectElements: CompiledEffect[] = [];
            while (!this.effectsAreComplete(configEffect.effect, dt)) {
                const combinedEffectElement = new EffectCombiner(configEffect.effect).combine(dt);
                const compiledEffectElement = new CompiledEffect(
                    configEffect.triggerEvents,
                    combinedEffectElement,
                    dt,
                    this.timestepMillis,
                    configEffect.priority,
                    configEffect.isAmbient,
                    configEffect.isModifier);

                compiledEffectElements.push(compiledEffectElement);
                console.log(compiledEffectElement);
                dt = dt + this.timestepMillis;
            }

            if (configEffect.isAmbient) {
                const ambientDuration = dt - this.timestepMillis;
                console.log(`ambient duration: ${ambientDuration}`);
                for (let el of compiledEffectElements) {
                    el.ambientDuration = ambientDuration;
                }
            }
            compiled.push(compiledEffectElements);
        }
        return compiled
    }
}
