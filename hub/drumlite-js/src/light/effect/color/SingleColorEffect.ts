import PartialEffect from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class SingleColorEffect extends PartialEffect {
    constructor(rgb?: RGB, dt: number = 0) {
        super("Single Color Effect", "Color", dt);
        this.params.rgb = rgb;
    }
    
    public getEffect(t: number) {
        return ResolvedEffect.createRgb(this.params.rgb as RGB)
    }

    public isTemporal() {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }
}