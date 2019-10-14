from light.effect.resolved_effect import ResolvedEffect
from light.effect.partial_effect import PartialEffect

class LinearFadeOutEffect(PartialEffect):
    def __init__(self, fadeOutDuration, dt=0):
        super().__init__(dt)
        self.fadeOutDuration = fadeOutDuration

    def getEffect(self, t):
        dt = t - self.startTime
        scale = 1 - dt / self.fadeOutDuration
        return ResolvedEffect.createAmplitude(scale)

    def isTemporal(self):
        return True

    def isComplete(self, t):
        return t - self.startTime >= self.fadeOutDuration
