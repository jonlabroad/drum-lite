from light.effect.resolved_effect import ResolvedEffect
from light.effect.partial_effect import PartialEffect
from light.effect.effect_priority import EffectPriority

class BasicAmplitudeModifier(PartialEffect):
    def __init__(self):
        super().__init__(0)
        self.isModifier = True
