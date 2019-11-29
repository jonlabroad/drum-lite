import PartialEffect, { EffectParameter, EffectParameters } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class ConstantAmplitudeParams extends EffectParameters {
    amplitude = new EffectParameter<number>("Amplitude", 0)
    durationMilliseconds = new EffectParameter<number>("Amplitude", 0)

    constructor(amplitude: number = 1.0, durationMilliseconds: number = 0) {
        super(0);
        this.amplitude.val = amplitude;
        this.durationMilliseconds.val = durationMilliseconds
    }
}

export default class ConstantAmplitude extends PartialEffect<ConstantAmplitudeParams> {
    constructor(params: ConstantAmplitudeParams, dt: number = 0){
        super("Constant Amplitude", "Amplitude", params, dt);
    }

    public getEffect(t: number): ResolvedEffect {
        return ResolvedEffect.createAmplitude(this.params.amplitude.val);
    }

    public isTemporal(): boolean {
        return !!this.params.durationMilliseconds.val;
    }

    public isComplete(t:  number) {
        if (this.params.durationMilliseconds.val) {
            return t > this.params.durationMilliseconds.val;
        }
        return true;
    }
}