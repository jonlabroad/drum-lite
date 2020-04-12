import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class LinearFadeOutEffectParams extends EffectParameters {
    effectName = "Linear Fade Out";
    typeName = "Amplitude";

    constructor(amplitude: number = 1, fadeOutDuration: number = 1) {
        super();
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
        this.params.fadeOutDuration = new EffectParameter<number>("Fade Out Duration", fadeOutDuration, {range: defaultMillisecondRange});
    }
}

export default class LinearFadeOutEffect extends PartialEffect<LinearFadeOutEffectParams> {
    constructor(params: LinearFadeOutEffectParams, dt=0) {
        super(params, dt);
    }

    public getEffect(t: number, note?: MidiDrumNote) {
        const startTime = note ? note.time.getTime() : this.params.params.startTime.val;
        const dt = t - startTime;
        const startAmp = this.params.params.amplitude.val;
        const fadeOutDuration = this.params.params.fadeOutDuration.val as number;
        const scale = startAmp - dt / fadeOutDuration * startAmp;
        return [[ResolvedEffect.createAmplitude(scale)]];
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number, note?: MidiDrumNote) {
        const startTime = note ? note.time.getTime() : this.params.params.startTime.val;
        const fadeOutDuration = this.params.params.fadeOutDuration.val;
        return t - startTime >= fadeOutDuration;
    }
}