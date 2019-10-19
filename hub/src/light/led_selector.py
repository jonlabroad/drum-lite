from light.effect.effect_target_type import EffectTargetType

class LEDSelector:
    def __init__(self):
        pass

    def getAllTargetPositions(self, target):
        # TODO define this elsewhere (will not be constant per target either)
        if target == EffectTargetType.SNARE:
            return range(0, 55, 1)

        ledsPerTarget = 64
        start = ledsPerTarget * int(target)
        return range(start, start + ledsPerTarget, 1)

    def unalias(self, target, pos):
        # TODO this will not work for any other than the snare!!!

        targetPos = self.getAllTargetPositions(target)
        return pos % len(targetPos)