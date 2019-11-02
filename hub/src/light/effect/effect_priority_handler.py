import copy

from light.effect.effect_priority import EffectPriority

class EffectPriorityHandler:
    def __init__(self):
        self.leds = {}

    def addLedEffect(self, effect):
        for ledPos in effect.ledPositions:
            currentEffectsAtLed = self.leds.get(ledPos)
            #print("Current effects: " + str(currentEffectsAtLed))
            if not currentEffectsAtLed:
                currentEffectsAtLed = []

            useEffect = True
            for currEffect in currentEffectsAtLed:
                # Quit now if there are any with priority higher
                if effect.priority != EffectPriority.ANY and currEffect.priority > effect.priority and currEffect.isModifier == effect.isModifier:
                    useEffect = False
                    break

                # Quit now if there is already a higher priority effect
                if effect.priority != EffectPriority.ANY and currEffect.priority > effect.priority and currEffect.isModifier == effect.isModifier:
                    useEffect = False
                    break

                # Quit now if there are any same-priority effects at a later time
                if currEffect.priority == effect.priority and currEffect.noteTime >= effect.noteTime and currEffect.isModifier == effect.isModifier:
                    useEffect = False
                    break

            if not useEffect:
                continue

            # Remove any existing effects if necessary
            newEffectsAtLed = []
            for currEffect in currentEffectsAtLed:
                # Remove any of lower priority if this isn't a modifier
                if currEffect.priority <= effect.priority and currEffect.isModifier == effect.isModifier:
                    continue

                # Remove any at an equal priority and equal type but in the past
                if currEffect.priority == effect.priority and currEffect.t < effect.t and currEffect.isModifier == effect.isModifier:
                    continue

                newEffectsAtLed.append(currEffect.clone())

            #print("Adding: " + str([effect.t, effect.duration, effect.priority, effect.noteTime, effect.rgbw.r, effect.rgbw.g, effect.rgbw.b]))
            newEffectsAtLed.append(effect.clone())
            newEffectsAtLed.sort(key = lambda e: e.noteTime)
            self.leds[ledPos] = newEffectsAtLed

    def getLeds(self):
        return self.leds

    def clear(self):
        self.leds = {}