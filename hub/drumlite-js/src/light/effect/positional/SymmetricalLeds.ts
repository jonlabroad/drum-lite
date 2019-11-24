import PartialEffect from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class SymmetricalLeds extends PartialEffect {
    targets: EffectTarget[];
    numSym: number;
    sectionLength: number;
    offset: number;

    constructor(targets: EffectTarget[], numSym: number, sectionLength: number, offset = 0, dt = 0) {
        super(dt);
        this.targets = targets
        this.numSym = numSym
        this.sectionLength = sectionLength
        this.offset = offset
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.targets) {
            const tempPos: number[] = [];
            const tPos = ledSelector.getAllTargetPositions(target);
            const numLeds = tPos.length;
            for (let sectionNum of Util.range(0, this.numSym)) {
                const centerPos = Math.round(sectionNum * numLeds / this.numSym) + this.offset;
                tempPos.push(centerPos);
                tempPos.push(...Util.range(centerPos, centerPos + Math.round(this.sectionLength / 2), 1));
                tempPos.push(...Util.range(centerPos, centerPos - Math.round(this.sectionLength / 2), -1));
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
