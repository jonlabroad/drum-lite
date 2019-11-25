import PartialEffect from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class ConstantAmplitude extends PartialEffect {
    amplitude: number;
    durationMillis?: number;
    
    constructor(amplitude: number, durationMillis: number | undefined = undefined, dt: number = 0){
        super("Constant Amplitude", "Amplitude", dt);
        this.amplitude = amplitude;
        this.durationMillis = durationMillis;
    }

    public getEffect(t: number): ResolvedEffect {
        return ResolvedEffect.createAmplitude(this.amplitude);
    }

    public isTemporal(): boolean {
        return !!this.durationMillis;
    }

    public isComplete(t:  number) {
        if (this.durationMillis) {
            return t > this.durationMillis;
        }
        return true;
    }
}