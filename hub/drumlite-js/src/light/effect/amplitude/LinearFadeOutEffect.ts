import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class LinearFadeOutEffectParams extends EffectParameters {
    amplitude = new EffectParameter<number>("Amplitude", 1.0);
    fadeOutDuration = new EffectParameter<number>("Fade Out Duration", 0);

    constructor(amplitude: number = 1, fadeOutDuration: number = 1) {
        super(0);
        this.amplitude.val = amplitude;
        this.fadeOutDuration.val = fadeOutDuration;
    }
}

export default class LinearFadeOutEffect extends PartialEffect<LinearFadeOutEffectParams> {
    constructor(params: LinearFadeOutEffectParams, dt=0) {
        super("Linear Fade Out", "Amplitude", params, dt);
    }

    public getEffect(t: number) {
        const dt = t - this.params.startTime.val;
        const startAmp = this.params.amplitude.val;
        const fadeOutDuration = this.params.fadeOutDuration.val as number;
        const scale = startAmp - dt / fadeOutDuration * startAmp;
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        const startTime = this.params.startTime.val;
        const fadeOutDuration = this.params.fadeOutDuration.val;
        return t - startTime >= fadeOutDuration;
    }
}