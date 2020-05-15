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

export class RacerConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets(values);
        this.params["Color"] = CommonParams.color(values);
        this.params["Amplitude"] = CommonParams.amplitude(values);
        this.params["Period"] = new EffectParameter<number>("Period", values.Period, {range: defaultMillisecondRange});
        this.params["Num"] = new EffectParameter<number>("Number", values.Number ?? 0);
        this.params["Speed"] = new EffectParameter<number>("Speed", values.Speed ?? 0);
        this.params["Offset"] = new EffectParameter<number>("Offset", values.Offset ?? 0);
        this.params["Transition"] = new EffectParameter<TransitionType>("Transition", values.Transition ?? 0);
    }
}

export default class RacerEffect extends RunnableEffect {
    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const ledPositions = new SpinEffect(this.config).getInstructions(t);
        const color = new ColorElementEffect(this.config).getInstructions(t);
        const amplitude = new AmplitudeElementEffect(this.config).getInstructions(t);
        return [new LedInstruction(color.rgb, amplitude.amplitude, ledPositions.ledPositions)];
    }
}