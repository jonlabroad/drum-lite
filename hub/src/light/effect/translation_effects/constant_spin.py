import math

from light.effect.partial_effect import PartialEffect
from light.led_selector import LEDSelector
from light.effect.resolved_effect import ResolvedEffect
from midi.hit_type import HitType
from light.effect.effect_priority import EffectPriority
from util.scale_functions import ScaleFunctions

class ConstantSpin(PartialEffect):
    def __init__(self, targets, period, speed, num, offset, amplitude=1.0):
        super().__init__(0)
        self.targets = targets
        self.period = period
        self.num = num
        self.offset = offset
        self.amplitude = amplitude

    def getEffect(self, t):
        tNorm = ScaleFunctions.linear(t, self.startTime, self.period)
        ledPositions = []

        for target in self.targets:
            positions = LEDSelector().getAllTargetPositions(target)
            startPos = positions[0]
            ledsPerChild = len(positions) / self.num
            for child in range(0, self.num):
                childPt = startPos + round(child * ledsPerChild + tNorm * len(positions)) + self.offset
                ledPositions.append(LEDSelector().unalias(target, childPt))

        return ResolvedEffect(None, None, list(set(ledPositions)))

    def isTemporal(self):
        return True

    def isComplete(self, t):
        return t > self.startTime + self.period