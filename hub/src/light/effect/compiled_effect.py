from light.effect.resolved_effect import ResolvedEffect

class CompiledEffect(ResolvedEffect):
    def __init__(self, hitTypes, effect, dt, duration):
        super().__init__(effect.rgbw, effect.amplitude, effect.ledPositions)
        self.dt = dt
        self.duration = duration
        self.hitTypes = hitTypes
    
    def toString(self):
        print(str(self.dt) + ": " + super().toString())
