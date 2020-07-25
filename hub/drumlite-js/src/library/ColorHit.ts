import EffectConfig from "../config/EffectConfig";
import LedInstruction from "../effect/LedInstruction";
import RunnableEffect, { RunnableEffectType } from "../effect/RunnableEffect";
import CommonParams from "../config/params/CommonParams";
import MidiDrumNote from "../midi/MidiDrumNote";
import ColorTransitionEffect, { ColorTransitionConfig } from "./elements/behaviors/ColorTransition";
import LEDSelector from "../util/LEDSelector";
import NoteAmplitudeEffect, { NoteAmplitudeConfig } from "./elements/behaviors/NoteAmplitude";

export class ColorHitConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Targets"] = CommonParams.targets("Targets", values);
        this.params["Colors"] = CommonParams.color("Colors", values, { isArray: true });
        this.params["Period"] = CommonParams.period(values);
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Triggers"] = CommonParams.triggers("Triggers", values);
        this.params["Singleton"] = CommonParams.singleton("Singleton", values);
        this.params["Priority"] = CommonParams.priority(values);
    }
}

export default class ColorHitEffect extends RunnableEffect {
    public type: RunnableEffectType = "colorhit";

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const instrs = [];
        const ledPositions = new LEDSelector().getAllTargetPositions(this.config.params?.Targets?.val ?? [])
        const color = new ColorTransitionEffect(new ColorTransitionConfig({
            starttime: note?.time ?? this.config.params.StartTime?.val,
            colors: this.config.params?.Colors?.val ?? [],
            period: this.config.params.Period.val,
        })).getInstructions(t, note);
        const amplitude = new NoteAmplitudeEffect(new NoteAmplitudeConfig({
            transition: this.config.params?.Transition?.val ?? "linear"
        })).getInstructions(t, note);
        instrs.push(new LedInstruction(color.rgb, amplitude.amplitude, ledPositions, this.config.params.Priority?.val));
        return instrs;
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const period = this.config.params.Period.val;
        const dt = t - startTime;
        return dt > period;
    }
}