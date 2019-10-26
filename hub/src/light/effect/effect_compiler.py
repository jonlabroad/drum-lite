from light.effect.effect_combiner import EffectCombiner
from light.effect.compiled_effect import CompiledEffect

class EffectCompiler:
    def __init__(self, config):
        self.timestep = 0.05
        self.config = config

    def effectsAreComplete(self, effects, dt):
        for effect in effects:
            if (effect.isTemporal() and not effect.isComplete(dt)):
                return False
        return True

    def compile(self):
        compiled = []
        for configEffect in self.config:
            dt = 0
            compiledEffectElements = []
            while (not self.effectsAreComplete(configEffect.effect, dt)):
                combinedEffectElement = EffectCombiner(configEffect.effect).combine(dt)
                compiledEffectElement = CompiledEffect(configEffect.triggerEvents , combinedEffectElement, dt, self.timestep, configEffect.priority, configEffect.isAmbient)
                compiledEffectElements.append(compiledEffectElement)
                dt = dt + self.timestep

            compiled.append(compiledEffectElements)
        return compiled


