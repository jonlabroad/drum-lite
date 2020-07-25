import LedInstruction from "../../../effect/LedInstruction";
import MidiDrumNote from "../../../midi/MidiDrumNote";
import EffectConfig from "../../../config/EffectConfig";
import { ModifierEffectType } from "../../../effect/RunnableEffect";

export default abstract class EffectModifier {
    public config: EffectConfig = new EffectConfig();
    public note?: MidiDrumNote;
    public abstract type: ModifierEffectType;

    constructor(config: EffectConfig, note?: MidiDrumNote) {
        this.config = config;
        this.note = note;
    };

    abstract modInstructions(instructions: LedInstruction[], t: number): LedInstruction[];

    abstract isComplete(t: number): boolean;
}