import EffectConfig from "../config/EffectConfig";
import RacerEffect, { RacerConfig } from "./Racer";
import RunnableEffect, { RunnableEffectType } from "../effect/RunnableEffect";
import ColorHitEffect, { ColorHitConfig } from "./ColorHit";
import ConstantAmplitudeEffect, { ConstantAmplitudeConfig } from "./elements/behaviors/ConstantAmplitude";

export default class EffectFactory {
    public static create(type: RunnableEffectType, values: {[key: string]: any}): RunnableEffect | undefined {
        switch(type.toLowerCase()) {
            case "racer": return new RacerEffect(new RacerConfig(values));
            case "constantamplitude": return new ConstantAmplitudeEffect(new ConstantAmplitudeConfig(values));
            case "colorhit": return new ColorHitEffect(new ColorHitConfig(values));
            default: console.error(`Do not know effect of type ${type}`);
        }
    }
}