import PartialEffect from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import LEDSelector from "../../LEDSelector";

export default class ConstantTargetsEffect extends PartialEffect {
    targets: EffectTarget[];
    
    constructor(targets: EffectTarget[], dt: number = 0) {
        super(dt);
        this.targets = targets
    }

    public getEffect(t: number) {
        const pos = [];
        for (let target of this.targets) {
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