import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class LinearFadeOutEffectParams extends EffectParameters {
    effectName = "Linear Fade Out";
    typeName = "Amplitude";

    constructor(amplitude: number = 1, fadeOutDuration: number = 1) {
        super(0);
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
        this.params.fadeOutDuration = new EffectParameter<number>("Fade Out Duration", fadeOutDuration);
    }
}

export default class LinearFadeOutEffect extends PartialEffect<LinearFadeOutEffectParams> {
    constructor(params: LinearFadeOutEffectParams, dt=0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const dt = t - this.params.params.startTime.val;
        const startAmp = this.params.params.amplitude.val;
        const fadeOutDuration = this.params.params.fadeOutDuration.val as number;
        const scale = startAmp - dt / fadeOutDuration * startAmp;
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        const startTime = this.params.params.startTime.val;
        const fadeOutDuration = this.params.params.fadeOutDuration.val;
        return t - startTime >= fadeOutDuration;
    }
}