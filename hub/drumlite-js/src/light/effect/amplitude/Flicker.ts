import PartialEffect, { EffectParameter, EffectParameters, defaultMillisecondRange } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class FlickerParams extends EffectParameters {
    effectName = "Flicker";
    typeName = "Amplitude";

    constructor(amplitude: number = 1.0, intensity = 0.5, durationMilliseconds: number = 100) {
        super();
        this.params.amplitude = new EffectParameter<number>("Flicker Amplitude", amplitude);
        this.params.flickerIntensity = new EffectParameter<number>("Flicker Intensity", intensity, {range: {max: 1.0, min: 0.1, inc: 0.05}});
        this.params.durationMilliseconds = new EffectParameter<number>("Duration (Milliseconds)", durationMilliseconds, {isHidden: true, range: defaultMillisecondRange});
    }
}

export default class Flicker extends PartialEffect<FlickerParams> {
    lastFlickerTime = 0;
    flickered = false;

    constructor(params: FlickerParams, dt: number = 0){
        super(params, dt);
    }

    public getEffect(t: number): ResolvedEffect[][] {
        const { params } = this.params;
        const baseAmplitude = params.amplitude.val;
        const intensity = params.flickerIntensity.val;
        const baseDuration = params.durationMilliseconds.val;
        let amplitude = baseAmplitude;

        const timeSinceLast = t - this.lastFlickerTime;
        const fudge = Math.random();
        if (timeSinceLast > baseDuration * fudge) {
            this.flickered = !this.flickered;
            this.lastFlickerTime = t;
        }

        if (this.flickered) {
            amplitude = baseAmplitude * (1 - intensity);
        }
        return [[ResolvedEffect.createAmplitude(amplitude)]];
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