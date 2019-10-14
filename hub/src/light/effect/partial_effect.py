from light.effect.resolved_effect import ResolvedEffect
from light.rgbw import RGBW

class PartialEffect:
    def __init__(self, startTime):
        self.startTime = startTime

    def getEffect(self):
        return ResolvedEffect(None, None, None)

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False