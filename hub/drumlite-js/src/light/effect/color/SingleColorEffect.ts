import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SingleColorEffectParams extends EffectParameters {
    effectName = "Single Color";
    typeName = "Color";

    constructor(rgb: RGB = new RGB()) {
        super(0);
        this.params.rgb = new EffectParameter<RGB>("Color", rgb, {type: "rgb"});
    }
}

export default class SingleColorEffect extends PartialEffect<SingleColorEffectParams> {
    constructor(params: SingleColorEffectParams, dt: number = 0) {
        super(params, dt);
    }
    
    public getEffect(t: number) {
        return [[ResolvedEffect.createRgb(this.params.params.rgb.val)]];
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}