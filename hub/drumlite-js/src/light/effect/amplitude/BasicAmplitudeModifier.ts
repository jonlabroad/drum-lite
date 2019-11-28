import EffectModifier from "../EffectModifier"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class BasicAmplitudeModifier extends EffectModifier {
    constructor(amplitude?: number) {
        super("Basic Amplitude Modifier", "Modifier");
        this.params.amplitude = amplitude;
    }

    public getEffect(t: number) {
        return ResolvedEffect.createAmplitude(this.params.amplitude as number);
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
