import { EffectTarget } from "../EffectTarget";
import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class CubicSingleSpiralParams extends EffectParameters {
    effectName = "Cubic Single Spiral";
    typeName = "Positional";

    constructor(targets: EffectTarget[] = [], numChildren: number = 1, amplitude: number = 1, duration: number = 1) {
        super(0);
        this.params.duration = new EffectParameter<number>("Duration", duration, {range: defaultMillisecondRange});
        this.params.numChildren = new EffectParameter<number>("Number", numChildren)
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, {type: "target", isArray: true})
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude)
    }
}

export default class CubicSingleSpiral extends PartialEffect<CubicSingleSpiralParams> {
    constructor(params: CubicSingleSpiralParams, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const tNorm = ScaleFunctions.cubicEaseOut(t, this.params.params.startTime.val, this.params.params.duration.val);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();
        for (let target of (this.params.params.targets.val)) {
            const positions = ledSelector.getAllTargetPositions(target);
            const fullChildLength = Math.ceil(positions.length / (this.params.params.numChildren.val));
            const childLength = Math.ceil((1 - tNorm) * fullChildLength);

            for (let child of Util.range(0, this.params.params.numChildren.val)) {
                const childRoot = Math.round(child * fullChildLength + tNorm * fullChildLength);
                const tailPos = Util.range(childRoot - childLength, childRoot);
                for (let p of tailPos) {
                    ledPositions.push(ledSelector.unalias(target, p));
                }
            }
        }

        return [[new ResolvedEffect(undefined, undefined, [...new Set<number>(ledPositions)])]];
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.params.params.startTime.val + (this.params.params.duration.val);
    }
}