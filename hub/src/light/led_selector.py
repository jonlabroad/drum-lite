class LEDSelector:
    def __init__(self):
        pass

    def getAllTargetPositions(self, target):
        # TODO define this elsewhere (will not be constant per target either)
        ledsPerTarget = 64
        start = ledsPerTarget * int(target)
        return range(start, start + ledsPerTarget, 1) 