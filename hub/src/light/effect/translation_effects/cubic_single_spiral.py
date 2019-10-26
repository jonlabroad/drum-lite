import math

from light.effect.partial_effect import PartialEffect
from light.led_selector import LEDSelector
from light.effect.resolved_effect import ResolvedEffect
from midi.hit_type import HitType
from light.effect.effect_priority import EffectPriority
from util.scale_functions import ScaleFunctions

class CubicSingleSpiral(PartialEffect):
    def __init__(self, targets, duration, numChildren, amplitude=1.0):
        super().__init__(0)
        self.duration = duration
        self.numChildren = numChildren
        self.targets = targets
        self.amplitude = amplitude

    def getEffect(self, t):
        tNorm = ScaleFunctions.cubicEaseOut(t, self.startTime, self.duration)
        ledPositions = []

        for target in self.targets:
            positions = LEDSelector().getAllTargetPositions(target)
            fullChildLength = math.ceil(len(positions) / self.numChildren)
            childLength = math.ceil((1 - tNorm) * fullChildLength)

            for child in range(0, self.numChildren):
                childRoot = int(child * fullChildLength + tNorm * fullChildLength)
                tailPos = range(childRoot - childLength, childRoot)
                for p in tailPos:
                    ledPositions.append(LEDSelector().unalias(target, p))

        return ResolvedEffect(None, None, list(set(ledPositions)))

    def isTemporal(self):
        return True

    def isComplete(self, t):
        return t > self.startTime + self.duration