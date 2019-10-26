from light.effect.resolved_effect import ResolvedEffect
from light.effect.partial_effect import PartialEffect
from light.effect.effect_priority import EffectPriority

class ConstantAmplitude(PartialEffect):
    def __init__(self, amplitude, dt=0):
        super().__init__(dt)
        self.amplitude = amplitude

    def getEffect(self, t):
        return ResolvedEffect.createAmplitude(self.amplitude)

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False
