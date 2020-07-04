import EffectConfig from "../config/EffectConfig";
import LedInstruction from "../effect/LedInstruction";
import RunnableEffect, { PartialRunnableEffect } from "../effect/RunnableEffect";
import ConstantSpinEffect from "./elements/behaviors/ConstantSpin";
import CommonParams from "../config/params/CommonParams";
import { EffectParameter, defaultMillisecondRange } from "../config/effects/EffectParameter";
import ColorElementEffect from "./elements/rudiments/ColorElement";
import AmplitudeElementEffect from "./elements/rudiments/AmplitudeElement";
import MidiDrumNote from "../midi/MidiDrumNote";
import { TransitionType } from "../config/transitions/TransitionType";
import SpinEffect from "./elements/behaviors/Spin";
import { HitType } from "../midi/HitType";

export class RacerConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets(values);
        this.params["Color"] = CommonParams.color(values);
        this.params["Amplitude"] = CommonParams.amplitude(values);
        this.params["Period"] = new EffectParameter<number>("Period", values.period, {range: defaultMillisecondRange});
        this.params["Num"] = new EffectParameter<number>("Number", values.number ?? 0);
        this.params["Speed"] = new EffectParameter<number>("Speed", values.speed ?? 0);
        this.params["Offset"] = new EffectParameter<number>("Offset", values.offset ?? 0);
        this.params["Transition"] = new EffectParameter<TransitionType>("Transition", values.transition ?? "linear", {type: "transition"});
        this.params["Triggers"] = new EffectParameter<HitType>("Triggers", values.triggers ?? [], {type: "hittype"});
    }
}

export default class RacerEffect extends RunnableEffect {
    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const ledPositions = new SpinEffect(this.config).getInstructions(t);
        const color = new ColorElementEffect(this.config).getInstructions(t);
        const amplitude = new AmplitudeElementEffect(this.config).getInstructions(t);
        return [new LedInstruction(color.rgb, amplitude.amplitude, ledPositions.ledPositions)];
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const period = this.config.params.Period.val;
        const dt = t - startTime;
        return dt > period;
    }
}