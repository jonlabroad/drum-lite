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
        this.params["StartTime"] = CommonParams.startTime();
        this.params["Targets"] = CommonParams.targets();
        this.params["Period"] = new EffectParameter<number>("Period", 1000, {range: defaultMillisecondRange});
        this.params["Num"] = new EffectParameter<number>("Number", values.number ?? 0);
        this.params["Speed"] = new EffectParameter<number>("Speed", values.speed ?? 0);
        this.params["Offset"] = new EffectParameter<number>("Offset", values.offset ?? 0);
        this.params["Transition"] = new EffectParameter<TransitionType>("Transition", "linear", {type: "transition"});
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

        return new LedInstruction(undefined, undefined, ledPositions);
    }

}