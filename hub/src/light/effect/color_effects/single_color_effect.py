from light.effect.partial_effect import PartialEffect
from light.effect.resolved_effect import ResolvedEffect
from light.effect.effect_priority import EffectPriority

class SingleColorEffect(PartialEffect):
    def __init__(self, rgbw, dt=0):
        super().__init__(dt)
        self.rgbw = rgbw
    
    def getEffect(self, t):
        return ResolvedEffect.createRgbw(self.rgbw)

    def isTemporal(self):
        return False

    def isComplete(self, t):
        return False