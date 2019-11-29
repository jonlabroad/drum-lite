import { EffectTarget } from "../EffectTarget";
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import Util from "../../../util/Util";
import LEDSelector from "../../LEDSelector";

export class ConstantSpinParams extends EffectParameters {
    targets = new EffectParameter<EffectTarget[]>("Targets", [], "target", true);
    period = new EffectParameter<number>("Period", 0);
    num = new EffectParameter<number>("Number", 1);
    speed = new EffectParameter<number>("Speed", 1);
    offset = new EffectParameter<number>("Offset", 0);
    amplitude = new EffectParameter<number>("Amplitude", 1);

    constructor(targets: EffectTarget[], period: number, num: number, speed: number, offset: number, amplitude: number) {
        super(0);
        this.targets.val = targets;
        this.period.val = period;
        this.num.val = num;
        this.speed.val = speed;
        this.offset.val = offset;
        this.amplitude.val = amplitude;
    }
}

export default class ConstantSpin extends PartialEffect<ConstantSpinParams> {
    constructor(params: ConstantSpinParams, dt = 0) {
        super("Constant Spin", "Positional", params, dt);
    }

    public getEffect(t: number) {
        const {
            targets,
            period,
            num,
            offset,
            amplitude
        } = this.params;

        const tNorm = ScaleFunctions.linear(t, this.params.startTime.val, period.val);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();

        for (let target of targets.val) {
            const positions = ledSelector.getAllTargetPositions(target);
            const startPos = positions[0];
            const ledsPerChild = positions.length / (num.val);
            for (let child of Util.range(0, num.val)) {
                const childPt = startPos + Math.round(child * ledsPerChild + tNorm * positions.length) + (offset.val);
                ledPositions.push(ledSelector.unalias(target, childPt));
            }
        }

        return new ResolvedEffect(undefined, undefined, [...new Set<number>(ledPositions)]);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.params.startTime.val + (this.params.period.val);
    }
}
