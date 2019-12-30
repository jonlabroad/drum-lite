import RGB from "../../RGB"
import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";

export class LinearColorTransitionParams extends EffectParameters {
    effectName = "Linear Color Transition";
    typeName = "Color";

    constructor(src: RGB = new RGB(), dst: RGB = new RGB(), duration: number = 0) {
        super(0);
        this.params.src = new EffectParameter<RGB>("Start Color", src, {type: "rgb"});
        this.params.dst = new EffectParameter<RGB>("End Color", dst, {type: "rgb"});
        this.params.duration = new EffectParameter<number>("Duration", duration, {range: defaultMillisecondRange});
    }
}

export default class LinearColorTransition extends PartialEffect<LinearColorTransitionParams> {
    constructor(params: LinearColorTransitionParams) {
        super(params, 0);
    }
    
    public getEffect(t: number) {
        const dt = t - this.params.params.startTime.val;
        const tNorm = dt / (this.params.params.duration.val);
        return [[ResolvedEffect.createRgb(ColorTransition.linear(tNorm, this.params.params.src.val, this.params.params.dst.val))]];
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}
