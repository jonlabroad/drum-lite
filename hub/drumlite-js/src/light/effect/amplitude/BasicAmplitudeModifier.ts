import EffectModifier from "../EffectModifier"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import { EffectParameters, EffectParameter } from "../PartialEffect";

export class BasicAmplitudeModifierParams extends EffectParameters {
    amplitude = new EffectParameter<number>("Amplitude", 1.0)

    constructor(amplitude = 1) {
        super(0);
        this.amplitude.val = amplitude;
    }
}

export default class BasicAmplitudeModifier extends EffectModifier<BasicAmplitudeModifierParams> {
    constructor(params: BasicAmplitudeModifierParams) {
        super("Basic Amplitude Modifier", "Modifier", params);
    }

    public getEffect(t: number) {
        return ResolvedEffect.createAmplitude(this.params.amplitude.val as number);
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
