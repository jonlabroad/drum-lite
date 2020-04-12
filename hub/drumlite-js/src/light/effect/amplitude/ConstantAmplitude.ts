import PartialEffect, { EffectParameter, EffectParameters, defaultMillisecondRange } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class ConstantAmplitudeParams extends EffectParameters {
    effectName = "Constant Amplitude";
    typeName = "Amplitude";

    constructor(amplitude: number = 1.0, durationMilliseconds: number = 0) {
        super();
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
        this.params.durationMilliseconds = new EffectParameter<number>("Duration (Milliseconds)", durationMilliseconds, {isHidden: true, range: defaultMillisecondRange});
    }
}

export default class ConstantAmplitude extends PartialEffect<ConstantAmplitudeParams> {
    constructor(params: ConstantAmplitudeParams, dt: number = 0){
        super(params, dt);
    }

    public getEffect(t: number): ResolvedEffect[][] {
        return [[ResolvedEffect.createAmplitude(this.params.params.amplitude.val)]];
    }

    public isTemporal(): boolean {
        return !!this.params.params.durationMilliseconds.val;
    }

    public isComplete(t:  number, note?: MidiDrumNote) {
        if (note && note.velocity < this.params.params.minTriggerVelocity.val) {
            return true;
        }

        if (this.params.params.durationMilliseconds.val) {
            return t > this.params.params.durationMilliseconds.val;
        }
        return true;
    }
}