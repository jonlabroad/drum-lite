import EffectConfig from "../config/EffectConfig";
import LedInstruction from "../effect/LedInstruction";
import RunnableEffect, { PartialRunnableEffect, RunnableEffectType } from "../effect/RunnableEffect";
import ConstantSpinEffect from "./elements/behaviors/ConstantSpin";
import CommonParams from "../config/params/CommonParams";
import { EffectParameter, defaultMillisecondRange } from "../config/effects/EffectParameter";
import ColorElementEffect from "./elements/rudiments/ColorElement";
import AmplitudeElementEffect from "./elements/rudiments/AmplitudeElement";
import MidiDrumNote from "../midi/MidiDrumNote";
import { TransitionType } from "../config/transitions/TransitionType";
import SpinEffect, { SpinConfig } from "./elements/behaviors/Spin";
import { HitType } from "../midi/HitType";
import ColorTransition from "../util/ColorTransition";
import ColorTransitionEffect, { ColorTransitionConfig } from "./elements/behaviors/ColorTransition";
import RGB from "../light/RGB";

export class RacerConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets(values);
        this.params["Color"] = CommonParams.color("Color", values);
        this.params["Amplitude"] = CommonParams.amplitude(values);
        this.params["Period"] = CommonParams.period(values);
        this.params["Num"] = CommonParams.number("Num", values, undefined, 1);
        this.params["Speed"] = CommonParams.speed(values);
        this.params["Offset"] = CommonParams.number("Offset", values);
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Triggers"] = CommonParams.triggers("Triggers", values);
        this.params["Length"] = CommonParams.number("Length", values, undefined, 1);
    }
}

export default class RacerEffect extends RunnableEffect {
    public type: RunnableEffectType = "racer";

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const instrs = [];
        for (let n = -this.config.params.Length?.val ?? 1; n < 0; n++) {
            const ledPositions = new SpinEffect(new SpinConfig({
                ...this.config.values,
                offset: n + (this.config.params.Offset?.val ?? 0)
            })).getInstructions(t);
            /*
            const color = new ColorTransitionEffect(new ColorTransitionConfig({
                colors: [
                    new RGB(100, 200, 50),
                    new RGB(200, 50, 50),
                    new RGB(10, 50, 200),
                ],
                period: this.config.params.Period.val,
            })).getInstructions(t, note);
            */
            const color = new ColorElementEffect(this.config).getInstructions(t);
            const amplitude = new AmplitudeElementEffect(this.config).getInstructions(t);
            instrs.push(new LedInstruction(color.rgb, amplitude.amplitude, ledPositions.ledPositions));
        }
        return instrs;
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const period = this.config.params.Period.val;
        const dt = t - startTime;
        return dt > period;
    }
}