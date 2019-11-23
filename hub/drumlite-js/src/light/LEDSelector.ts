import { EffectTarget } from "./effect/EffectTarget"
import Util from "../util/Util"

export default class LEDSelector {
    public getAllTargetPositions(target: EffectTarget) {
        // TODO define this elsewhere (will not be constant per target either)
        if (target == EffectTarget.SNARE) {
            return Util.range(0, 51);
        }
        else if (target == EffectTarget.TOM1) {
            return Util.range(52, 87);
        }
        else if (target == EffectTarget.TOM2) {
            return Util.range(88, 120);
        }
        else if (target == EffectTarget.TOM3) {
            return Util.range(121, 154);
        }

        return []
    }

    public unalias(target: EffectTarget, pos: number) {
        const targetPos = this.getAllTargetPositions(target);
        const startPos = targetPos[0];
        return targetPos.length > 0 ? (pos % targetPos.length + startPos) : -1;
    }
}
