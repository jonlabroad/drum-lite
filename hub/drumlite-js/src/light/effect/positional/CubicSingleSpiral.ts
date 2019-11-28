import { EffectTarget } from "../EffectTarget";
import PartialEffect from "../PartialEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class CubicSingleSpiral extends PartialEffect {
    constructor(targets: EffectTarget[], duration: number, numChildren: number, amplitude=1.0) {
        super("Cubic Single Spiral", "Positional", 0);
        this.params.duration = duration
        this.params.numChildren = numChildren
        this.params.targets = targets
        this.params.amplitude = amplitude
    }

    public getEffect(t: number) {
        const tNorm = ScaleFunctions.cubicEaseOut(t, this.params.startTime, this.params.duration as number);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();
        for (let target of (this.params.targets as EffectTarget[])) {
            const positions = ledSelector.getAllTargetPositions(target);
            const fullChildLength = Math.ceil(positions.length / (this.params.numChildren as number));
            const childLength = Math.ceil((1 - tNorm) * fullChildLength);

            for (let child of Util.range(0, this.params.numChildren as number)) {
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
        return t > this.params.startTime + (this.params.duration as number);
    }
}