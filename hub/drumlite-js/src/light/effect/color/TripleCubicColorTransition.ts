import RGB from "../../RGB"
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export class TripleCubicColorTransitionParams extends EffectParameters {
    effectName = "Triple Cubic Transition";
    typeName = "Color";

    constructor(src: RGB = new RGB(), dst1: RGB = new RGB(), dst2: RGB = new RGB(), duration: number = 1) {
        super(0);
        this.params.src = new EffectParameter<RGB>("Start Color", src);
        this.params.dst1 = new EffectParameter<RGB>("Intermediate Color", dst1);
        this.params.dst2 = new EffectParameter<RGB>("End Color", dst2);
        this.params.duration = new EffectParameter<number>("Duration", duration);
    }
}

export default class TripleCubicColorTransition extends PartialEffect<TripleCubicColorTransitionParams> {
    constructor(params: TripleCubicColorTransitionParams, dt = 0) {
        super(params, dt);
    }
    
    getEffect(t: number) {
        const dt = t - this.params.params.startTime.val;
        let tNorm = 1 - dt / (this.params.params.duration.val);
        tNorm = (tNorm * tNorm * tNorm);

        const dst = tNorm > 0.5 ? this.params.params.dst1 : this.params.params.dst2;
        const src = tNorm > 0.5 ? this.params.params.src : this.params.params.dst1;
        const tNormAdjusted = tNorm <= 0.5 ? (tNorm * 2) : ((tNorm - 0.5) * 2);
        
        return ResolvedEffect.createRgb(ColorTransition.linear(1 - tNormAdjusted, src.val, dst.val));
    }

    isTemporal() {
        return false;
    }

    isComplete(t: number) {
        return false;
    }
}