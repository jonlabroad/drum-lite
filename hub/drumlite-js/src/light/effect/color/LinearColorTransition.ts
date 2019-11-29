import RGB from "../../RGB"
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export class LinearColorTransitionParams extends EffectParameters {
    src = new EffectParameter<RGB>("Start Color", new RGB())
    dst = new EffectParameter<RGB>("End Color", new RGB())
    duration = new EffectParameter<number>("Duration", 0)

    constructor(src: RGB, dst: RGB, duration: number) {
        super(0);
        this.src.val = src;
        this.dst.val = dst;
        this.duration.val = duration;
    }
}

export default class LinearColorTransition extends PartialEffect<LinearColorTransitionParams> {
    constructor(params: LinearColorTransitionParams) {
        super("Linear Color Transition", "Color", params, 0);
    }
    
    public getEffect(t: number) {
        const dt = t - this.params.startTime.val;
        const tNorm = dt / (this.params.duration.val);
        return ResolvedEffect.createRgb(ColorTransition.linear(tNorm, this.params.src.val, this.params.dst.val));
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
