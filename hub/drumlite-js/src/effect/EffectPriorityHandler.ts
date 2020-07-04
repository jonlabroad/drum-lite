import { EffectPriority } from "../config/effects/EffectPriority";
import LedInstruction from "./LedInstruction";

export default class EffectPriorityHandler {
    leds: Record<number, LedInstruction[]> = {};
    
    constructor() {
        this.leds = {}
    }

    public addLedEffect(effect: LedInstruction) {
        if (!effect.ledPositions) {
            return;
        }

        for (let ledPos of effect.ledPositions) {
            let currentEffectsAtLed = this.leds[ledPos];
            if (!currentEffectsAtLed) {
                currentEffectsAtLed = [];
            }

            let useEffect = true;
            for (let currEffect of currentEffectsAtLed) {
                // Quit now if there are any with priority higher
                if (effect.priority != EffectPriority.ANY && currEffect.priority > effect.priority) {
                    useEffect = false;
                    break;
                }

                // Quit now if there is already a higher priority effect
                if (effect.priority != EffectPriority.ANY && currEffect.priority > effect.priority) {
                    useEffect = false;
                    break;
                }

                // Quit now if there are any same-priority effects at a later time
                if (currEffect.priority == effect.priority && currEffect.getNoteTime() >= effect.getNoteTime()) {
                    useEffect = false;
                    break;
                }
            }
            if (!useEffect) {
                continue;
            }

            // Remove any existing effects if necessary
            const newEffectsAtLed = [];
            for (let currEffect of currentEffectsAtLed) {
                // Remove any of lower priority
                if (currEffect.priority <= effect.priority) {
                    continue;
                }

                // Remove any at an equal priority and equal type but in the past
                if (currEffect.priority == effect.priority && currEffect.getNoteTime() < effect.getNoteTime()) {
                    continue;
                }

                newEffectsAtLed.push(Object.assign({}, currEffect));
            }

            newEffectsAtLed.push(effect.copy());
            newEffectsAtLed.sort((a, b) => a.getNoteTime() - b.getNoteTime());
            this.leds[ledPos] = newEffectsAtLed;
        }
    }

    public getLeds() {
        return this.leds;
    }

    public clear() {
        this.leds = {}
    }
}