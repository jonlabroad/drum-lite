from light.effect.resolved_effect import ResolvedEffect
from light.rgbw import RGBW
from light.effect.effect_priority import EffectPriority

class PartialEffect:
    def __init__(self, startTime=0):
        self.startTime = startTime
        self.isModifier = False

    def getEffect(self):
        return ResolvedEffect(None, None, None)

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False

    def getAmbientDuration(self):
        return 0