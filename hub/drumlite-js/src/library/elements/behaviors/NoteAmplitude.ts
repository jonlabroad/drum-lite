import EffectConfig from "../../../config/EffectConfig";
import { PartialRunnableEffect } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";
import MidiDrumNote from "../../../midi/MidiDrumNote";
import NoteScaler from "../../../util/NoteScaler";

export class NoteAmplitudeConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["Transition"] = CommonParams.transition("Transition", values);
    }
}

export default class NoteAmplitudeEffect extends PartialRunnableEffect {
    constructor(config: NoteAmplitudeConfig) {
        super(config);
    }

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction {
        const scaled = NoteScaler.scale(note?.velocity ?? 0, this.config.params.Transition?.val);
        return new LedInstruction(undefined, scaled, undefined, this.config.params.Priority?.val);
    }

    public isComplete(t: number) {
        return false;
    }
}