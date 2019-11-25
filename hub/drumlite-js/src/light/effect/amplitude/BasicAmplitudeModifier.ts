import EffectModifier from "../EffectModifier"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class BasicAmplitudeModifier extends EffectModifier {
    amplitude: number;
    
    constructor(amplitude: number) {
        super("Basic Amplitude Modifier", "Modifier");
        this.amplitude = amplitude;
    }

    public getEffect(t: number) {
        return ResolvedEffect.createAmplitude(this.amplitude);
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
