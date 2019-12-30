import { EffectTarget } from "../EffectTarget";
import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ScaleFunctions from "../../../util/ScaleFunctions";
import Util from "../../../util/Util";
import LEDSelector from "../../LEDSelector";

export class ConstantSpinParams extends EffectParameters {
    effectName = "Constant Spin";
    typeName = "Positional";

    constructor(targets: EffectTarget[] = [], period: number = 1, num: number = 1, speed: number = 1, offset: number = 0, amplitude: number = 1) {
        super(0);
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, {type: "target", isArray: true});
        this.params.period = new EffectParameter<number>("Period", period, {range: defaultMillisecondRange});
        this.params.num = new EffectParameter<number>("Number", num);
        this.params.speed = new EffectParameter<number>("Speed", speed);
        this.params.offset = new EffectParameter<number>("Offset", offset);
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
    }
}

export default class ConstantSpin extends PartialEffect<ConstantSpinParams> {
    constructor(params: ConstantSpinParams, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const {
            targets,
            period,
            num,
            offset,
            amplitude,
            startTime
        } = this.params.params;

        const tNorm = ScaleFunctions.linear(t, startTime.val, period.val);
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

        return [[new ResolvedEffect(undefined, undefined, [...new Set<number>(ledPositions)])]];
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t > this.params.params.startTime.val + (this.params.params.period.val);
    }
}
