class ResolvedEffect:
    def __init__(self, rgbw, amplitude, ledPositions):
       self.rgbw = rgbw
       self.amplitude = amplitude
       self.ledPositions = ledPositions

    @staticmethod
    def createRgbw(rgbw):
        return ResolvedEffect(rgbw, None, None)

    @staticmethod
    def createAmplitude(amplitude):
        return ResolvedEffect(None, amplitude, None)

    @staticmethod
    def createTranslation(ledPositions):
        return ResolvedEffect(None, None, ledPositions)

    def toString(self):
        return str([None if self.rgbw is None else self.rgbw.toString(), self.amplitude, self.ledPositions])