from light.effect.partial_effect import PartialEffect
from light.led_selector import LEDSelector
from light.effect.resolved_effect import ResolvedEffect

class ConstantTargetsEffect(PartialEffect):
    def __init__(self, targets, dt=0):
        super().__init__(dt)
        self.targets = targets

    def getEffect(self, t):
        pos = []
        for target in self.targets:
            pos.extend(LEDSelector().getAllTargetPositions(target))

        return ResolvedEffect.createTranslation(list(set(pos)))

    def isTemporal(self):
        # Constant targets do not control timing
        return False

    def isComplete(self, t):
        return True