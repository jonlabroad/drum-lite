import PartialEffect from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class ConstantAmplitude extends PartialEffect {
    constructor(amplitude?: number, durationMillis: number | undefined = undefined, dt: number = 0){
        super("Constant Amplitude", "Amplitude", dt);
        this.params.amplitude = amplitude;
        this.params.durationMillis = durationMillis;
    }

    public getEffect(t: number): ResolvedEffect {
        return ResolvedEffect.createAmplitude(this.params.amplitude as number);
    }

    public isTemporal(): boolean {
        return !!this.params.durationMillis;
    }

    public isComplete(t:  number) {
        if (this.params.durationMillis) {
            return t > this.params.durationMillis;
        }
        return true;
    }
}