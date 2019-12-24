import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export class TripleLinearColorTransitionParams extends EffectParameters {
    effectName = "Triple Linear Transition";
    typeName = "Color";

    constructor(src: RGB = new RGB(), dst1: RGB = new RGB(), dst2: RGB = new RGB(), duration: number = 1) {
        super(0);
        this.params.src = new EffectParameter<RGB>("Start Color", src);
        this.params.dst1 = new EffectParameter<RGB>("Intermediate Color", dst1);
        this.params.dst2 = new EffectParameter<RGB>("End Color", dst2);
        this.params.duration = new EffectParameter<number>("Duration", duration);
    }
}

export default class TripleLinearColorTransition extends PartialEffect<TripleLinearColorTransitionParams> {
    constructor(params: TripleLinearColorTransitionParams, dt = 0) {
        super(params, dt);
    }
    
    public getEffect(t: number) {
        const {
            src,
            dst1,
            dst2,
            duration
        } = this.params.params;

        const dt = t - this.params.params.startTime.val;
        const tNorm = dt / (duration.val);

        const dst = (dt <= 0.5 ? dst1.val : dst2.val);
        const srcRgb = (dt <= 0.5 ? src.val : dst1.val);
        const tNormAdjusted = dt <= 0.5 ? (tNorm * 2) : ((tNorm - 0.5) * 2);

        return ResolvedEffect.createRgb(ColorTransition.linear(tNormAdjusted, srcRgb, dst))
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}