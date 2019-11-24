import { EffectTarget } from "../EffectTarget";
import PartialEffect from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import Util from "../../../util/Util";
import LEDSelector from "../../LEDSelector";

export default class ConstantSpin extends PartialEffect {
    targets: EffectTarget[];
    period: number;
    num: number;
    offset: number;
    amplitude: number;


    constructor(targets: EffectTarget[], period: number, speed: number, num: number, offset: number, amplitude = 1.0) {
        super(0);
        this.targets = targets
        this.period = period
        this.num = num
        this.offset = offset
        this.amplitude = amplitude
    }

    public getEffect(t: number) {
        const tNorm = ScaleFunctions.linear(t, this.startTime, this.period);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();

        for (let target of this.targets) {
            const positions = ledSelector.getAllTargetPositions(target);
            const startPos = positions[0];
            const ledsPerChild = positions.length / this.num;
            for (let child of Util.range(0, this.num)) {
                const childPt = startPos + Math.round(child * ledsPerChild + tNorm * positions.length) + this.offset;
                ledPositions.push(ledSelector.unalias(target, childPt));
            }
        }

        return new ResolvedEffect(undefined, undefined, [...(new Set<number>(ledPositions))]);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.startTime + this.period;
    }
}
