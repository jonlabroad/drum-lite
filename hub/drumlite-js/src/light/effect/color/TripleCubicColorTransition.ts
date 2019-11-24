import RGB from "../../RGB"
import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class TripleCubicColorTransition extends PartialEffect {
    src: RGB;
    dst1: RGB;
    dst2: RGB;
    duration: number;

    constructor(srcRgb: RGB, dstRgb1: RGB, dstRgb2: RGB, duration: number) {
        super(0);
        this.src = srcRgb;
        this.dst1 = dstRgb1;
        this.dst2 = dstRgb2;
        this.duration = duration;
    }
    
    getEffect(t: number) {
        const dt = t - this.startTime;
        let tNorm = 1 - dt / this.duration;
        tNorm = (tNorm * tNorm * tNorm);

        const dst = tNorm > 0.5 ? this.dst1 : this.dst2;
        const src = tNorm > 0.5 ? this.src : this.dst1;
        const tNormAdjusted = tNorm <= 0.5 ? (tNorm * 2) : ((tNorm - 0.5) * 2);
        
        return ResolvedEffect.createRgb(ColorTransition.linear(1 - tNormAdjusted, src, dst));
    }

    isTemporal() {
        return false;
    }

    isComplete(t: number) {
        return false;
    }
}