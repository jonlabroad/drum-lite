import { EffectTarget } from "../EffectTarget";
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class CubicSingleSpiralParams extends EffectParameters {
    duration = new EffectParameter<number>("Duration", 0)
    numChildren = new EffectParameter<number>("Number", 1)
    targets = new EffectParameter<EffectTarget[]>("Targets", [], "target", true)
    amplitude = new EffectParameter<number>("Amplitude", 1)
}

export default class CubicSingleSpiral extends PartialEffect<CubicSingleSpiralParams> {
    constructor(params: CubicSingleSpiralParams, dt = 0) {
        super("Cubic Single Spiral", "Positional", params, dt);
    }

    public getEffect(t: number) {
        const tNorm = ScaleFunctions.cubicEaseOut(t, this.params.startTime.val, this.params.duration.val);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();
        for (let target of (this.params.targets.val)) {
            const positions = ledSelector.getAllTargetPositions(target);
            const fullChildLength = Math.ceil(positions.length / (this.params.numChildren.val));
            const childLength = Math.ceil((1 - tNorm) * fullChildLength);

            for (let child of Util.range(0, this.params.numChildren.val)) {
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
        return t > this.params.startTime.val + (this.params.duration.val);
    }
}