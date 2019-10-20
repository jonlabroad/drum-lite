from light.effect.partial_effect import PartialEffect
from light.effect.resolved_effect import ResolvedEffect
from util.color_transition import ColorTransition
from light.effect.effect_priority import EffectPriority

class TripleLinearColorTransition(PartialEffect):
    def __init__(self, srcRgb, dstRgb1, dstRgb2, duration):
        super().__init__(0)
        self.src = srcRgb
        self.dst1 = dstRgb1
        self.dst2 = dstRgb2
        self.duration = duration
    
    def getEffect(self, t):
        dt = t - self.startTime
        tNorm = dt / self.duration

        dst = self.dst1 if dt <= 0.5 else self.dst2
        src = self.src if dt <= 0.5 else self.dst1
        tNormAdjusted = (tNorm * 2) if dt <= 0.5 else ((tNorm - 0.5) * 2)

        return ResolvedEffect.createRgbw(ColorTransition.linear(tNormAdjusted, src, dst))

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False