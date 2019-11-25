import PartialEffect from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class TripleLinearColorTransition extends PartialEffect {
    src: RGB;
    dst1: RGB;
    dst2: RGB;
    duration: number;
    
    constructor(srcRgb: RGB, dstRgb1: RGB, dstRgb2: RGB, duration: number) {
        super("Triple Linear Transition", "Color", 0);
        this.src = srcRgb;
        this.dst1 = dstRgb1;
        this.dst2 = dstRgb2;
        this.duration = duration;
    }
    
    public getEffect(t: number) {
        const dt = t - this.startTime;
        const tNorm = dt / this.duration;

        const dst = dt <= 0.5 ? this.dst1 : this.dst2;
        const src = dt <= 0.5 ? this.src : this.dst1;
        const tNormAdjusted = dt <= 0.5 ? (tNorm * 2) : ((tNorm - 0.5) * 2);

        return ResolvedEffect.createRgb(ColorTransition.linear(tNormAdjusted, src, dst))
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}