import EffectConfig from "../config/EffectConfig";
import LedInstruction from "../effect/LedInstruction";
import RunnableEffect, { PartialRunnableEffect, RunnableEffectType } from "../effect/RunnableEffect";
import CommonParams from "../config/params/CommonParams";
import ColorElementEffect from "./elements/rudiments/ColorElement";
import AmplitudeElementEffect from "./elements/rudiments/AmplitudeElement";
import MidiDrumNote from "../midi/MidiDrumNote";
import SpinEffect, { SpinConfig } from "./elements/behaviors/Spin";
import ColorTransitionEffect from "./elements/behaviors/ColorTransition";

export class KickPulseConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets("Targets", values);
        this.params["Colors"] = CommonParams.color("Colors", values);
        this.params["Amplitude"] = CommonParams.amplitude(values);
        this.params["Period"] = CommonParams.period(values);
        this.params["Num"] = CommonParams.number("Num", values, undefined, 1);
        this.params["Speed"] = CommonParams.speed(values);
        this.params["Offset"] = CommonParams.number("Offset", values);
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Triggers"] = CommonParams.triggers("Triggers", values);
        this.params["Length"] = CommonParams.number("Length", values, undefined, 1);
        this.params["Duration"] = CommonParams.number("Duration", values);
        this.params["Priority"] = CommonParams.priority(values);
    }
}

export default class KickPulseEffect extends RunnableEffect {
    public type: RunnableEffectType = "kickpulse";

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const instrs = [];
        for (let n = -this.config.params.Length?.val ?? 1; n < 0; n++) {
            const ledPositions = new SpinEffect(new SpinConfig({
                ...this.config.values,
                period: 10000000,
                offset: n + (this.config.params.Offset?.val ?? 0)
            })).getInstructions(t);

            const color = new ColorTransitionEffect(this.config).getInstructions(t);
            const amplitude = new AmplitudeElementEffect(this.config).getInstructions(t);
            instrs.push(new LedInstruction(color.rgb, amplitude.amplitude, ledPositions.ledPositions, this.config.params.Priority?.val));
        }
        return instrs;
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const period = this.config.params.Duration.val;
        const dt = t - startTime;
        return dt > period;
    }
}