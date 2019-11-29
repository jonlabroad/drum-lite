import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class CubicFadeOutParameters extends EffectParameters {
    fadeOutDuration = new EffectParameter<number>("Fade Out Duration", 0);
}

export default class CubicFadeOut extends PartialEffect<CubicFadeOutParameters> {
    constructor(params: CubicFadeOutParameters, dt = 0) {
        super("Cubic Fade Out", "Amplitude", params, dt);
    }

    public getEffect(t: number) {
        const dt = t - this.params.startTime.val;
        const tNorm = dt / (this.params.fadeOutDuration.val) - 1;
        const scale = 1 - (tNorm * tNorm * tNorm + 1);
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal(): boolean {
        return true;
    }

    public isComplete(t: number) {
        return t - this.params.startTime.val >= (this.params.fadeOutDuration.val);
    }
}
