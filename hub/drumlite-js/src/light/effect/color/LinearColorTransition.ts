import RGB from "../../RGB"
import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export default class LinearColorTransition extends PartialEffect {
    src: RGB;
    dst: RGB;
    duration: number;
    
    constructor(srcRgb: RGB, dstRgb: RGB, duration: number) {
        super("Linear Color Transition", "Color", 0);
        this.src = srcRgb
        this.dst = dstRgb
        this.duration = duration
    }
    
    public getEffect(t: number) {
        const dt = t - this.startTime;
        const tNorm = dt / this.duration;
        return ResolvedEffect.createRgb(ColorTransition.linear(tNorm, this.src, this.dst));
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
