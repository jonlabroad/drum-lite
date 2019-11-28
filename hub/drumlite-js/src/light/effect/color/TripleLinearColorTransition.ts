import PartialEffect from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class TripleLinearColorTransition extends PartialEffect {
    constructor(srcRgb?: RGB, dstRgb1?: RGB, dstRgb2?: RGB, duration?: number) {
        super("Triple Linear Transition", "Color", 0);
        this.params.src = srcRgb;
        this.params.dst1 = dstRgb1;
        this.params.dst2 = dstRgb2;
        this.params.duration = duration;
    }
    
    public getEffect(t: number) {
        const {
            src,
            dst1,
            dst2,
            duration
        } = this.params;

        const dt = t - this.params.startTime;
        const tNorm = dt / (duration as number);

        const dst = (dt <= 0.5 ? dst1 : dst2) as RGB;
        const srcRgb = (dt <= 0.5 ? src : dst1) as RGB;
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