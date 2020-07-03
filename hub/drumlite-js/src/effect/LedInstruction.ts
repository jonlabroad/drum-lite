import RGB from "../light/RGB"
import { EffectPriority } from "../config/effects/EffectPriority";
import MidiDrumNote from "../midi/MidiDrumNote";

export default class LedInstruction {
    public rgb?: RGB;
    public amplitude?: number;
    public ledPositions?: number[];
    public priority: EffectPriority = EffectPriority.LOWEST;
    public note?: MidiDrumNote;
    
    constructor(rgb?: RGB, amplitude?: number, ledPositions?: number[], priority?: EffectPriority, note?: MidiDrumNote) {
       this.rgb = rgb;
       this.amplitude = amplitude;
       this.ledPositions = ledPositions;
       this.priority = priority ?? this.priority;
       this.note = note;
    }

    public getNoteTime(): number {
        return this.note?.time?.getTime() ?? 0;
    }

    public toString() {
        return `${[this.rgb ? this.rgb : undefined, this.amplitude, this.ledPositions, this.priority]}`;
    }
}