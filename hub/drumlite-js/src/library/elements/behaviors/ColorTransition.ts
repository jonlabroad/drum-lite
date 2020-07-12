import EffectConfig from "../../../config/EffectConfig";
import RunnableEffect, { PartialRunnableEffect, RunnableEffectType } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";
import MidiDrumNote from "../../../midi/MidiDrumNote";
import RGB from "../../../light/RGB";
import ColorTransition from "../../../util/ColorTransition";
import Transition, { TransitionType } from "../../../config/transitions/TransitionType";
import ScaleFunctions from "../../../util/ScaleFunctions";
import Transitions from "../../../config/transitions/Transitions";

export class ColorTransitionConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Colors"] = CommonParams.color("Colors", values, { isArray: true });
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Period"] = CommonParams.period(values);
    }
}

export default class ColorTransitionEffect extends PartialRunnableEffect {
    constructor(config: ColorTransitionConfig) {
        super(config);
    }

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction {
        const transition = this.config.params.Transition.val as TransitionType;
        const startTime = this.config.params.StartTime?.val ?? 0 as number;
        const period = this.config.params.Period.val as number;
        const tNorm = Transitions.get(transition).getTNorm(t, startTime, period);
        const color = this.findColor(tNorm);

        return new LedInstruction(color, undefined, undefined);
    }

    public isComplete(t: number) {
        return false;
    }

    private findColor(tNorm: number): RGB {
        const { Colors } = this.config.params;

        const scaledTNorm = tNorm * (Colors.val.length - 1);
        const startColorNum = Math.floor(scaledTNorm);
        const endColorNum = Math.min(Math.floor(scaledTNorm) + 1, Colors.val.length - 1);
        const relativeColorT = scaledTNorm - startColorNum;
        return ColorTransition.linear(relativeColorT, Colors.val[startColorNum], Colors.val[endColorNum]);
    }
}