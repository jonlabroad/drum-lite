import { EffectTarget } from "../EffectTarget";
import PartialEffect from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import Util from "../../../util/Util";
import LEDSelector from "../../LEDSelector";

export default class ConstantSpin extends PartialEffect {
    constructor(targets: EffectTarget[] = [], period?: number, speed?: number, num?: number, offset?: number, amplitude = 1.0) {
        super("Constant Spin", "Positional", 0);
        this.params.targets = targets
        this.params.period = period
        this.params.num = num
        this.params.offset = offset
        this.params.amplitude = amplitude
    }

    public getEffect(t: number) {
        const {
            targets,
            period,
            num,
            offset,
            amplitude
        } = this.params;

        const tNorm = ScaleFunctions.linear(t, this.params.startTime, period as number);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();

        for (let target of (targets as EffectTarget[])) {
            const positions = ledSelector.getAllTargetPositions(target);
            const startPos = positions[0];
            const ledsPerChild = positions.length / (num as number);
            for (let child of Util.range(0, num as number)) {
                const childPt = startPos + Math.round(child * ledsPerChild + tNorm * positions.length) + (offset as number);
                ledPositions.push(ledSelector.unalias(target, childPt));
            }
        }

        return new ResolvedEffect(undefined, undefined, [...new Set<number>(ledPositions)]);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.params.startTime + (this.params.period as number);
    }
}
