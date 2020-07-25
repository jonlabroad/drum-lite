import EffectConfig from "../../../config/EffectConfig";
import CommonParams from "../../../config/params/CommonParams";
import { defaultMillisecondRange, EffectParameter } from "../../../config/effects/EffectParameter";
import { PartialRunnableEffect } from "../../../effect/RunnableEffect";
import LedInstruction from "../../../effect/LedInstruction";
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../../util/LEDSelector";
import Util from "../../../util/Util";
import { TransitionType } from "../../../config/transitions/TransitionType";
import Transitions from "../../../config/transitions/Transitions";

export class SpinConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets("Targets", values);
        this.params["Period"] = CommonParams.period(values);
        this.params["Num"] = CommonParams.number("num", values, undefined, 1);
        this.params["Offset"] = CommonParams.number("offset", values, undefined, 0);
        this.params["Transition"] = CommonParams.transition("transition", values);
    }
}

export default class SpinEffect extends PartialRunnableEffect {
    constructor(config: SpinConfig) {
        super(config);
    }

    public getInstructions(t: number): LedInstruction {
        const {
            StartTime,
            Period,
            Targets,
            Num,
            Offset,
            Transition
        } = this.config.params;

        const transition = Transitions.get(Transition.val);
        const tNorm = transition.getTNorm(t, StartTime.val, Period.val);
        const ledPositions: number[] = [];
        const ledSelector = new LEDSelector();
        for (let target of Targets.val) {
            const positions = ledSelector.getAllTargetPositions(target);
            const startPos = positions[0];
            const ledsPerChild = positions.length / (Num.val);
            for (let child of Util.range(0, Num.val)) {
                const childPt = startPos + Math.round(child * ledsPerChild + tNorm * positions.length) + (Offset.val);
                ledPositions.push(ledSelector.unalias(target, childPt));
            }
        }

        return new LedInstruction(undefined, undefined, ledPositions, this.config.params.Priority?.val);
    }

}