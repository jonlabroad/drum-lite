import EffectConfig from "../config/EffectConfig";
import RunnableEffect, { RunnableEffectType, ModifierEffectType } from "../effect/RunnableEffect";
import AmplitudeModifierEffect, { AmplitudeModifierConfig } from "./elements/modifiers/AmplitudeModifier";
import EffectModifier from "./elements/modifiers/EffectModifier";
import MidiDrumNote from "../midi/MidiDrumNote";

export default class ModifierFactory {
    public static create(type: ModifierEffectType, values: {[key: string]: any}, note?: MidiDrumNote): EffectModifier | undefined {
        switch(type.toLowerCase()) {
            case "amplitude": return new AmplitudeModifierEffect(new AmplitudeModifierConfig(values), note);
            default: console.error(`Do not know effect of type ${type}`);
        }
    }
}