import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SymmetricalLedsParams extends EffectParameters {
    targets = new EffectParameter<EffectTarget[]>("Targets", [], "target", true)
    numSym = new EffectParameter<number>("Number", 1)
    sectionLength = new EffectParameter<number>("Length", 1)
    offset = new EffectParameter<number>("Offset", 0)

    constructor(targets: EffectTarget[], numSym: number, sectionsLength: number, offset: number) {
        super(0);
        this.targets.val = targets;
        this.numSym.val = numSym;
        this.sectionLength.val = sectionsLength;
        this.offset.val = offset;
    }
}

export default class SymmetricalLeds extends PartialEffect<SymmetricalLedsParams> {
    constructor(params: SymmetricalLedsParams, dt = 0) {
        super("Symmetrical", "Positional", params, dt);
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.params.targets.val) {
            const tempPos: number[] = [];
            const tPos = ledSelector.getAllTargetPositions(target);
            const numLeds = tPos.length;
            for (let sectionNum of Util.range(0, this.params.numSym.val)) {
                const centerPos = Math.round(sectionNum * numLeds / this.params.numSym.val) + (this.params.offset.val);
                tempPos.push(centerPos);
                tempPos.push(...Util.range(centerPos, centerPos + Math.round((this.params.sectionLength.val) / 2), 1));
                tempPos.push(...Util.range(centerPos, centerPos - Math.round((this.params.sectionLength.val) / 2), -1));
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
