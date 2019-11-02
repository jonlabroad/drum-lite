import random

from light.effect.partial_effect import PartialEffect
from light.led_selector import LEDSelector
from light.effect.resolved_effect import ResolvedEffect
from light.effect.effect_priority import EffectPriority
from util.scale_functions import ScaleFunctions

class Sparkle(PartialEffect):
    def __init__(self, targets, startingDensity, sparkleSize, numIterations, duration):
        super().__init__()
        self.targets = targets
        self.startingDensity = startingDensity
        self.sparkleSize = sparkleSize
        self.duration = duration

    def getEffect(self, t):
        pos = []
        for target in self.targets:
            tempPos = []
            tNorm = 1 - ScaleFunctions.linear(t, self.startTime, self.duration)
            targetPos = LEDSelector().getAllTargetPositions(target)
            numLeds = len(targetPos)
            
            scaledDensity = int(self.startingDensity * tNorm)
            for sparkle in range(0, scaledDensity):
                randomLed = LEDSelector().unalias(target, random.randint(-1, numLeds))
                tempPos.append(randomLed)

            pos.extend(tempPos)

        return ResolvedEffect.createTranslation(list(set(tempPos)))

    def isTemporal(self):
        # Constant targets do not control timing
        return True

    def isComplete(self, t):
        return t > self.duration