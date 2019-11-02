from light.effect.partial_effect import PartialEffect
from light.led_selector import LEDSelector
from light.effect.resolved_effect import ResolvedEffect
from light.effect.effect_priority import EffectPriority

class SymmetricalLeds(PartialEffect):
    def __init__(self, targets, numSym, sectionLength, offset=0, dt=0):
        super().__init__(dt)
        self.targets = targets
        self.numSym = numSym
        self.sectionLength = sectionLength
        self.offset = offset

    def getEffect(self, t):
        pos = []
        for target in self.targets:
            tempPos = []
            tPos = LEDSelector().getAllTargetPositions(target)
            numLeds = len(tPos)
            for sectionNum in range(0, self.numSym):
                centerPos = int(round(sectionNum * numLeds / self.numSym)) + self.offset
                tempPos.append(centerPos)
                tempPos.extend(range(centerPos, centerPos + int(round(self.sectionLength / 2)), 1))
                tempPos.extend(range(centerPos, centerPos - int(round(self.sectionLength / 2)), -1))

            for p in tempPos:
                pos.append(LEDSelector().unalias(target, p))

        return ResolvedEffect.createTranslation(list(set(pos)))

    def isTemporal(self):
        # Constant targets do not control timing
        return False

    def isComplete(self, t):
        return True