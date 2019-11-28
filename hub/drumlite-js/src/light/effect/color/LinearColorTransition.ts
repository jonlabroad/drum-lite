import RGB from "../../RGB"
import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class LinearColorTransition extends PartialEffect {
    constructor(srcRgb?: RGB, dstRgb?: RGB, duration?: number) {
        super("Linear Color Transition", "Color", 0);
        this.params.src = srcRgb
        this.params.dst = dstRgb
        this.params.duration = duration
    }
    
    public getEffect(t: number) {
        const dt = t - this.params.startTime;
        const tNorm = dt / (this.params.duration as number);
        return ResolvedEffect.createRgb(ColorTransition.linear(tNorm, this.params.src as RGB, this.params.dst as RGB));
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
