import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SingleColorEffectParams extends EffectParameters {
    rgb = new EffectParameter<RGB>("Color", new RGB());

    constructor(rgb: RGB) {
        super(0);
        this.rgb.val = rgb;
    }
}

export default class SingleColorEffect extends PartialEffect<SingleColorEffectParams> {
    constructor(params: SingleColorEffectParams, dt: number = 0) {
        super("Single Color Effect", "Color", params, dt);
    }
    
    public getEffect(t: number) {
        return ResolvedEffect.createRgb(this.params.rgb.val)
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}