import PartialEffect from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class SymmetricalLeds extends PartialEffect {
    constructor(targets: EffectTarget[], numSym: number, sectionLength: number, offset = 0, dt = 0) {
        super("Symmetrical", "Positional", dt);
        this.params.targets = targets
        this.params.numSym = numSym
        this.params.sectionLength = sectionLength
        this.params.offset = offset
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of (this.params.targets as EffectTarget[])) {
            const tempPos: number[] = [];
            const tPos = ledSelector.getAllTargetPositions(target);
            const numLeds = tPos.length;
            for (let sectionNum of Util.range(0, this.params.numSym as number)) {
                const centerPos = Math.round(sectionNum * numLeds / (this.params.numSym as number)) + (this.params.offset as number);
                tempPos.push(centerPos);
                tempPos.push(...Util.range(centerPos, centerPos + Math.round((this.params.sectionLength as number) / 2), 1));
                tempPos.push(...Util.range(centerPos, centerPos - Math.round((this.params.sectionLength as number) / 2), -1));
            }

            for (let p of tempPos) {
                pos.push(ledSelector.unalias(target, p));
            }
        }

        return ResolvedEffect.createTranslation([...new Set<number>(pos)]);
    }

    public isTemporal() {
        // Constant targets do not control timing
        return false;
    }

    public isComplete(t: number) {
        return true;
    }
}
