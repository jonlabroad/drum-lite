class ScaleFunctions:
    @staticmethod
    def linear(t, startTime, duration):
        dt = t - startTime
        return dt / duration

    def cubicEaseOut(t, startTime, duration):
        dt = t - startTime
        tNorm = (1 - dt / duration)
        return 1 - tNorm * tNorm * tNorm
