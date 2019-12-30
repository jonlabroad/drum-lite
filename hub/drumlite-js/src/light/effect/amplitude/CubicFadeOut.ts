import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class CubicFadeOutParameters extends EffectParameters {
    effectName = "Cubic Fade Out";
    typeName = "Amplitude";

    constructor(fadeOutDuration: number = 0) {
        super(0);
        this.params.fadeOutDuration = new EffectParameter<number>("Fade Out Duration", fadeOutDuration, {range: defaultMillisecondRange});
    }
}

export default class CubicFadeOut extends PartialEffect<CubicFadeOutParameters> {
    constructor(params: CubicFadeOutParameters, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const dt = t - this.params.params.startTime.val;
        const tNorm = dt / (this.params.params.fadeOutDuration.val) - 1;
        const scale = 1 - (tNorm * tNorm * tNorm + 1);
        return [[ResolvedEffect.createAmplitude(scale)]];
    }

    public isTemporal(): boolean {
        return true;
    }

    public isComplete(t: number) {
        return t - this.params.params.startTime.val >= (this.params.params.fadeOutDuration.val);
    }
}
