from light.effect.effect_target_type import EffectTargetType

class LEDSelector:
    def __init__(self):
        pass

    def getAllTargetPositions(self, target):
        # TODO define this elsewhere (will not be constant per target either)
        if target == EffectTargetType.SNARE:
            return range(0, 51, 1)
        elif target == EffectTargetType.TOM1:
            return range(52, 87, 1)
        elif target == EffectTargetType.TOM2:
            return range(88, 120, 1)
        elif target == EffectTargetType.TOM3:
            return range(121, 154, 1)

        return []

    def unalias(self, target, pos):
        # TODO this will not work for any other than the snare!!!

        targetPos = self.getAllTargetPositions(target)
        startPos = targetPos[0]
        return (pos % len(targetPos) + startPos) if len(targetPos) > 0 else -1