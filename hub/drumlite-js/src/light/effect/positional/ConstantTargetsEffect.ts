import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import LEDSelector from "../../LEDSelector";

export class ConstantTargetsEffectParams extends EffectParameters {
    targets = new EffectParameter<EffectTarget[]>("Targets", [], "target", true)

    constructor(targets: EffectTarget[]) {
        super(0);
        this.targets.val = targets;
    }
}

export default class ConstantTargetsEffect extends PartialEffect<ConstantTargetsEffectParams> {
    constructor(params: ConstantTargetsEffectParams, dt: number = 0) {
        super("Constant Targets", "Positional", params, dt);
    }

    public getEffect(t: number) {
        const pos = [];
        for (let target of (this.params.targets.val)) {
            pos.push(...new LEDSelector().getAllTargetPositions(target));
        }

        return ResolvedEffect.createTranslation(Array.from(new Set<number>(pos)));
    }

    public isTemporal() {
        // Constant targets do not control timing
        return false;
    }

    public isComplete(t: number) {
        return true;
    }
}