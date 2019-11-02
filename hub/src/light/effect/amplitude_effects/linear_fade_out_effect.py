from light.effect.resolved_effect import ResolvedEffect
from light.effect.partial_effect import PartialEffect
from light.effect.effect_priority import EffectPriority

class LinearFadeOutEffect(PartialEffect):
    def __init__(self, fadeOutDuration, startAmplitude, dt=0):
        super().__init__(dt)
        self.fadeOutDuration = fadeOutDuration
        self.startAmplitude = startAmplitude

    def getEffect(self, t):
        dt = t - self.startTime
        scale = self.startAmplitude - dt / self.fadeOutDuration * self.startAmplitude
        return ResolvedEffect.createAmplitude(scale)

    def isTemporal(self):
        return True

    def isComplete(self, t):
        return t - self.startTime >= self.fadeOutDuration
