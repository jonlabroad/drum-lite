import copy

class BasicCombiner:
    def __init__(self):
        pass

    def combine(self, existingEffects):
        self.combineAmplitude(existingEffects)

    def combineAmplitude(self, existingEffects):
        for ledId in existingEffects:
            modifiers = list(filter(lambda e: e.isModifier, existingEffects[ledId]))
            ledEffects = list(filter(lambda e: not e.isModifier, existingEffects[ledId]))
            if len(ledEffects) > 1:
                print("MULTIPLE NON-MODIFIERS FOUND DURING COMBINATION: " + str(ledEffects))

            if len(modifiers) > 1:
                print("MULTIPLE MODIFIERS FOUND DURING COMBINATION: " + str(modifiers))

            if len(ledEffects) <= 0:
                continue

            for ledEffect in ledEffects:
                for modifier in modifiers:
                    if modifier.amplitude > 0.0:
                        if ledEffect.priority <= modifier.priority:
#                            if ledEffect.amplitude > 1.0:
#                                print("COMBINER INPUT EFFECT")
#                                print([ledId, ledEffect.amplitude])

                            ledEffect.amplitude = ledEffect.amplitude * (1 + modifier.amplitude)
                            #existingEffects[ledId] = modifiedEffect
    