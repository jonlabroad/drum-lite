from light.effect.partial_effect import PartialEffect
from light.effect.resolved_effect import ResolvedEffect
from util.color_transition import ColorTransition
from light.effect.effect_priority import EffectPriority

class LinearColorTransition(PartialEffect):
    def __init__(self, srcRgb, dstRgb, duration):
        super().__init__(0)
        self.src = srcRgb
        self.dst = dstRgb
        self.duration = duration
    
    def getEffect(self, t):
        dt = t - self.startTime
        tNorm = dt / self.duration
        return ResolvedEffect.createRgbw(ColorTransition.linear(tNorm, self.src, self.dst))

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False