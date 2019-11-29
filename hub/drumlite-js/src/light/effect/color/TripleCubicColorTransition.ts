import RGB from "../../RGB"
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export class TripleCubicColorTransitionParams extends EffectParameters {
    src = new EffectParameter<RGB>("Start Color", new RGB());
    dst1 = new EffectParameter<RGB>("Intermediate Color", new RGB());
    dst2 = new EffectParameter<RGB>("End Color", new RGB());
    duration = new EffectParameter<number>("Duration", 0);
}

export default class TripleCubicColorTransition extends PartialEffect<TripleCubicColorTransitionParams> {
    constructor(params: TripleCubicColorTransitionParams, dt = 0) {
        super("Triple Cubic Transition", "Color", params, dt);
    }
    
    getEffect(t: number) {
        const dt = t - this.params.startTime.val;
        let tNorm = 1 - dt / (this.params.duration.val);
        tNorm = (tNorm * tNorm * tNorm);

        const dst = tNorm > 0.5 ? this.params.dst1 : this.params.dst2;
        const src = tNorm > 0.5 ? this.params.src : this.params.dst1;
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