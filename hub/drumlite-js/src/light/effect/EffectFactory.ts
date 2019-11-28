import JsonEffectConfig from "./JsonEffectConfig";
import ConstantAmplitude from "./amplitude/ConstantAmplitude";
import PartialEffect from "./PartialEffect";
import CubicFadeOut from "./amplitude/CubicFadeOut";
import LinearFadeOutEffect from "./amplitude/LinearFadeOutEffect";
import BasicAmplitudeModifier from "./amplitude/BasicAmplitudeModifier";

export default class EffectFactory {
    public static createEffect(jsonConfig: string): PartialEffect | undefined {
        const config = JSON.parse(jsonConfig) as JsonEffectConfig;
        switch (config.className) {
            case "Constant Amplitude":
                return this.create(new ConstantAmplitude(), jsonConfig);
            case " Cubic Fade Out":
                return this.create(new CubicFadeOut(), jsonConfig);
            case "Linear Fade Out":
                return this.create(new LinearFadeOutEffect(), jsonConfig);
            case "Basic Amplitude Modifier":
                return this.create(new BasicAmplitudeModifier(), jsonConfig);
            default:
                console.error(`Unknown effect type ${config.className}`);
                return undefined;
        }
    }

    private static create(effect: PartialEffect, jsonConfig: string): PartialEffect {
        effect.fromJson(jsonConfig);
        return effect;
    }
}