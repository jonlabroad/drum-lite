from light.effect.resolved_effect import ResolvedEffect
from light.effect.effect_priority import EffectPriority

class CompiledEffect(ResolvedEffect):
    def __init__(self, hitTypes, effect, dt, duration, priority=EffectPriority.ANY, isAmbient=False):
        super().__init__(effect.rgbw, effect.amplitude, effect.ledPositions)
        self.dt = dt
        self.duration = duration
        self.hitTypes = hitTypes
        self.priority = priority
        self.isAmbient = isAmbient
    
    def toString(self):
        return super().toString()
