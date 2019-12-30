import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import { EffectTarget } from "../EffectTarget"
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SymmetricalLedsParams extends EffectParameters {
    effectName = "Symmetrical";
    typeName = "Positional";

    constructor(targets: EffectTarget[] = [], numSym: number = 1, sectionsLength: number = 1, offset: number = 0) {
        super();
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, {type: "target", isArray: true})
        this.params.numSym = new EffectParameter<number>("Number", numSym)
        this.params.sectionLength = new EffectParameter<number>("Length", sectionsLength)
        this.params.offset = new EffectParameter<number>("Offset", offset)
    }
}

export default class SymmetricalLeds extends PartialEffect<SymmetricalLedsParams> {
    constructor(params: SymmetricalLedsParams, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.params.params.targets.val) {
            const tempPos: number[] = [];
            const tPos = ledSelector.getAllTargetPositions(target);
            const numLeds = tPos.length;
            for (let sectionNum of Util.range(0, this.params.params.numSym.val)) {
                const centerPos = Math.round(sectionNum * numLeds / this.params.params.numSym.val) + (this.params.params.offset.val);
                tempPos.push(centerPos);
                tempPos.push(...Util.range(centerPos, centerPos + Math.round((this.params.params.sectionLength.val) / 2), 1));
                tempPos.push(...Util.range(centerPos, centerPos - Math.round((this.params.params.sectionLength.val) / 2), -1));
            }

            for (let p of tempPos) {
                pos.push(ledSelector.unalias(target, p));
            }
        }

        return [[ResolvedEffect.createTranslation([...new Set<number>(pos)])]];
    }

    public isTemporal() {
        // Constant targets do not control timing
        return false;
    }

    public isComplete(t: number) {
        return true;
    }
}
