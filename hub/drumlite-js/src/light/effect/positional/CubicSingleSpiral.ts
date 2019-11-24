import { EffectTarget } from "../EffectTarget";
import PartialEffect from "../PartialEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class CubicSingleSpiral extends PartialEffect {
    duration: number;
    numChildren: number;
    targets: EffectTarget[];
    amplitude: number;

    constructor(targets: EffectTarget[], duration: number, numChildren: number, amplitude=1.0) {
        super(0);
        this.duration = duration
        this.numChildren = numChildren
        this.targets = targets
        this.amplitude = amplitude
    }

    public getEffect(t: number) {
        const tNorm = ScaleFunctions.cubicEaseOut(t, this.startTime, this.duration);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();
        for (let target of this.targets) {
            const positions = ledSelector.getAllTargetPositions(target);
            const fullChildLength = Math.ceil(positions.length / this.numChildren);
            const childLength = Math.ceil((1 - tNorm) * fullChildLength);

            for (let child of Util.range(0, this.numChildren)) {
                const childRoot = Math.round(child * fullChildLength + tNorm * fullChildLength);
                const tailPos = Util.range(childRoot - childLength, childRoot);
                for (let p of tailPos) {
                    ledPositions.push(ledSelector.unalias(target, p));
                }
            }
        }

        return new ResolvedEffect(undefined, undefined, [...new Set<number>(ledPositions)]);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.startTime + this.duration;
    }
}