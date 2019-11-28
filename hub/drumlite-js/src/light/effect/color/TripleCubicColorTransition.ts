import RGB from "../../RGB"
import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class TripleCubicColorTransition extends PartialEffect {
    constructor(srcRgb: RGB, dstRgb1: RGB, dstRgb2: RGB, duration: number) {
        super("Triple Cubic Transition", "Color", 0);
        this.params.src = srcRgb;
        this.params.dst1 = dstRgb1;
        this.params.dst2 = dstRgb2;
        this.params.duration = duration;
    }
    
    getEffect(t: number) {
        const dt = t - this.params.startTime;
        let tNorm = 1 - dt / (this.params.duration as number);
        tNorm = (tNorm * tNorm * tNorm);

        const dst = tNorm > 0.5 ? this.params.dst1 : this.params.dst2;
        const src = tNorm > 0.5 ? this.params.src : this.params.dst1;
        const tNormAdjusted = tNorm <= 0.5 ? (tNorm * 2) : ((tNorm - 0.5) * 2);
        
        return ResolvedEffect.createRgb(ColorTransition.linear(1 - tNormAdjusted, src as RGB, dst as RGB));
    }

    isTemporal() {
        return false;
    }

    isComplete(t: number) {
        return false;
    }
}