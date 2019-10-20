from light.effect.resolved_effect import ResolvedEffect
from light.effect.partial_effect import PartialEffect
from light.effect.effect_priority import EffectPriority

class CubicFadeOutEffect(PartialEffect):
    def __init__(self, fadeOutDuration, dt=0):
        super().__init__(dt)
        self.fadeOutDuration = fadeOutDuration

    def getEffect(self, t):
        dt = t - self.startTime
        tNorm = dt / self.fadeOutDuration - 1
        scale = 1 - (tNorm * tNorm * tNorm + 1)

        return ResolvedEffect.createAmplitude(scale)

    def isTemporal(self):
        return True

    def isComplete(self, t):
        return t - self.startTime >= self.fadeOutDuration
