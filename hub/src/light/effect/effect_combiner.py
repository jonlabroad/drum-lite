from light.effect.resolved_effect import ResolvedEffect
from light.rgbw import RGBW

class EffectCombiner:
    def __init__(self, effects):
        self.unresolvedEffects = effects

    def combine(self, dt):
        color = self.combineColors(dt)
        amplitude = self.combineAmplitude(dt)
        ledPositions = self.combinePositions(dt)
        return ResolvedEffect(color, amplitude, ledPositions)


    def combineColors(self, dt):
        combinedColor = RGBW(0, 0, 0, 0)
        for unresolvedEffect in self.unresolvedEffects:
            resolvedEffect = unresolvedEffect.getEffect(dt)
            if (resolvedEffect.rgbw):
                combinedColor.add(resolvedEffect.rgbw)
        return combinedColor

    def combineAmplitude(self, dt):
        amplitude = 0
        for unresolvedEffect in self.unresolvedEffects:
            resolvedEffect = unresolvedEffect.getEffect(dt)
            if (resolvedEffect.amplitude):
                amplitude = amplitude + resolvedEffect.amplitude
        return amplitude

    def combinePositions(self, dt):
        positions = []
        for unresolvedEffect in self.unresolvedEffects:
            resolvedEffect = unresolvedEffect.getEffect(dt)
            print(resolvedEffect.ledPositions)
            if (resolvedEffect.ledPositions):
                positions.extend(resolvedEffect.ledPositions)
        return list(set(positions))

