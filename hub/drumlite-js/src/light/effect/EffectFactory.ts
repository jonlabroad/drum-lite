import JsonEffectConfig from "./JsonEffectConfig";
import ConstantAmplitude, { ConstantAmplitudeParams } from "./amplitude/ConstantAmplitude";
import PartialEffect from "./PartialEffect";
import CubicFadeOut, { CubicFadeOutParameters } from "./amplitude/CubicFadeOut";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "./amplitude/LinearFadeOutEffect";
import BasicAmplitudeModifier, { BasicAmplitudeModifierParams } from "./amplitude/BasicAmplitudeModifier";

export default class EffectFactory {
    public static createEffect(jsonConfig: string): PartialEffect<any> | undefined {
        const config = JSON.parse(jsonConfig) as JsonEffectConfig;
        switch (config.className) {
            case "Constant Amplitude":
                return this.create(new ConstantAmplitude(new ConstantAmplitudeParams()), jsonConfig);
            case "Cubic Fade Out":
                return this.create(new CubicFadeOut(new CubicFadeOutParameters()), jsonConfig);
            case "Linear Fade Out":
                return this.create(new LinearFadeOutEffect(new LinearFadeOutEffectParams()), jsonConfig);
            case "Basic Amplitude Modifier":
                return this.create(new BasicAmplitudeModifier(new BasicAmplitudeModifierParams()), jsonConfig);
            default:
                console.error(`Unknown effect type ${config.className}`);
                return undefined;
        }
    }

    private static create(effect: PartialEffect<any>, jsonConfig: string): PartialEffect<any> {
        effect.fromJson(jsonConfig);
        return effect;
    }
}