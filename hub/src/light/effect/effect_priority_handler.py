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
                if effect.priority != EffectPriority.ANY and currEffect.priority > effect.priority:
                    useEffect = False
                    break

                # Quit now if there is already a higher priority effect
                if effect.priority != EffectPriority.ANY and currEffect.priority > effect.priority:
                    useEffect = False
                    break

                # Quit now if there are any same-priority effects at a later time
                if currEffect.priority == effect.priority and currEffect.noteTime >= effect.noteTime:
                    useEffect = False
                    break

            if not useEffect:
                continue

            # Remove any existing effects if necessary
            newEffectsAtLed = []
            for currentEffect in currentEffectsAtLed:
                # Remove any of same or lower priority
                if currentEffect.priority < effect.priority:
                    continue

                # Remove any at an equal priority but in the past
                if currentEffect.priority == effect.priority and currentEffect.noteTime < effect.noteTime:
                    continue

                newEffectsAtLed.append(currentEffect)
            
            newEffectsAtLed.append(effect)
            newEffectsAtLed.sort(key = lambda e: e.noteTime)
            self.leds[ledPos] = newEffectsAtLed

    def getLeds(self):
        return self.leds

    def clear(self):
        self.leds = {}