import LedInstruction from "./LedInstruction";
import EffectConfig from "../config/EffectConfig";
import RGB from "../light/RGB";
import MidiDrumNote from "../midi/MidiDrumNote";

export default abstract class RunnableEffect {
    public config: EffectConfig = new EffectConfig();

    constructor(config: EffectConfig) {
        this.config = config;
    };
    public abstract getInstructions(t: number): LedInstruction[];
    public abstract isComplete(t: number): boolean;
}

export abstract class PartialRunnableEffect {
    public config: EffectConfig = new EffectConfig();

    constructor(config: EffectConfig) {
        this.config = config;
    };
    public abstract getInstructions(t: number, note?: MidiDrumNote): LedInstruction;

    public static resolve(t: number, partialEffects: PartialRunnableEffect[]): LedInstruction {
        const resolved = new LedInstruction();
        partialEffects.forEach(partialEffect => {
            const pi = partialEffect.getInstructions(t);
            resolved.amplitude = pi.amplitude ? pi.amplitude : resolved.amplitude;
            resolved.rgb = pi.rgb ? RGB.fromRGB(pi.rgb) : resolved.rgb;
            resolved.ledPositions = pi.ledPositions ? [...pi.ledPositions] : resolved.ledPositions;
        });
        return resolved;
    }
}