import CompiledEffect from "./CompiledEffect";
import { EffectPriority } from "./EffectPriority";

export default class EffectPriorityHandler {
    leds: Record<number, CompiledEffect[]> = {};
    
    constructor() {
        this.leds = {}
    }

    public addLedEffect(effect: CompiledEffect) {
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
                if (effect.priority != EffectPriority.ANY && currEffect.priority > effect.priority && currEffect.isModifier == effect.isModifier) {
                    useEffect = false;
                    break;
                }

                // Quit now if there is already a higher priority effect
                if (effect.priority != EffectPriority.ANY && currEffect.priority > effect.priority && currEffect.isModifier == effect.isModifier) {
                    useEffect = false;
                    break;
                }

                // Quit now if there are any same-priority effects at a later time
                if (currEffect.priority == effect.priority && currEffect.noteTime >= effect.noteTime && currEffect.isModifier == effect.isModifier) {
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
                // Remove any of lower priority if this isn't a modifier
                if (currEffect.priority <= effect.priority && currEffect.isModifier == effect.isModifier) {
                    continue;
                }

                // Remove any at an equal priority and equal type but in the past
                if (currEffect.priority == effect.priority && currEffect.t < effect.t && currEffect.isModifier == effect.isModifier) {
                    continue;
                }

                newEffectsAtLed.push(Object.assign({}, currEffect));
            }

            newEffectsAtLed.push(Object.assign({}, effect));
            newEffectsAtLed.sort((a, b) => a.noteTime - b.noteTime);
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