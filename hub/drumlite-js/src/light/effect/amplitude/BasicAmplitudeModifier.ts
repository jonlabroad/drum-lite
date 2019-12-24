import EffectModifier from "../EffectModifier"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import { EffectParameters, EffectParameter } from "../PartialEffect";

export class BasicAmplitudeModifierParams extends EffectParameters {
    effectName = "Basic Amplitude Modifier";
    typeName = "Modifier";

    constructor(amplitude = 1) {
        super(0);
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
    }
}

export default class BasicAmplitudeModifier extends EffectModifier<BasicAmplitudeModifierParams> {
    constructor(params: BasicAmplitudeModifierParams) {
        super(params);
    }

    public getEffect(t: number) {
        return ResolvedEffect.createAmplitude(this.params.params.amplitude.val as number);
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
