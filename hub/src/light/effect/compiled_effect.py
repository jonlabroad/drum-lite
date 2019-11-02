from light.effect.resolved_effect import ResolvedEffect
from light.effect.effect_priority import EffectPriority

class CompiledEffect(ResolvedEffect):
    def __init__(self, hitTypes, effect, dt, duration, priority=EffectPriority.ANY, isAmbient=False, isModifier=False, noteTime=0, t=0, ambientDuration=0):
        super().__init__(effect.rgbw, effect.amplitude, effect.ledPositions)
        self.dt = dt
        self.duration = duration
        self.hitTypes = hitTypes
        self.priority = priority
        self.isAmbient = isAmbient
        self.isModifier = isModifier
        self.noteTime = noteTime
        self.t = t
        self.ambientDuration = ambientDuration
    
    def clone(self):
        return CompiledEffect(
            self.hitTypes, 
            ResolvedEffect(
                self.rgbw,
                self.amplitude,
                self.ledPositions), 
            self.dt,
            self.duration,
            self.priority,
            self.isAmbient,
            self.isModifier,
            self.noteTime,
            self.t,
            self.ambientDuration)

    def toString(self):
        return super().toString()
