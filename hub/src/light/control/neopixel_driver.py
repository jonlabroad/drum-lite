import board
import neopixel
import time

ledsOnStrip = 160

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, ledsOnStrip, brightness=1.0, bpp=3, auto_write=False)
        self.previousLedEffects = {}

    def runEffects(self, effectsMap):
        startTime = time.time()

        totalDelay = 0
        numSamples = 0

        effectsToApply = {}
        for ledId in effectsMap:
            previousEffect = self.previousLedEffects.get(ledId)
            for effect in effectsMap[ledId]:
                #print([ledId, effect.t, effect.rgbw.r, effect.rgbw.g, effect.rgbw.b], len(effectsMap[ledId]))
                # Note, this assumes there is only one effect per led, which is what *should* be the case, but is dependent on the effects themselves
                if not effect.isModifier:
                    ledTime = time.time()
                    numSamples = numSamples + 1
                    delay = ledTime - effect.t
                    totalDelay = totalDelay + delay

                    r = max(0, effect.rgbw.r)
                    g = max(0, effect.rgbw.g)
                    b = max(0, effect.rgbw.b)
                    amplitude = max(0, effect.amplitude)
                    rgb = self.scaleByAmplitude((r, g, b), amplitude)
                    effectsToApply[ledId] = (min(255, rgb[0]), min(255, rgb[1]), min(255, rgb[2]))

        ledsNotDriven = set(range(0, ledsOnStrip)).difference(set(effectsToApply.keys()))
        for ledId in ledsNotDriven:
            effectsToApply[ledId] = (0, 0, 0)

        driveLeds = False
        for ledId, e in effectsToApply.items():
            prev = self.previousLedEffects.get(ledId)
            if (not prev) or e != prev:
                driveLeds = True
                break

        if driveLeds:
            self.pixels.fill((0, 0, 0))
            for ledId, e in effectsToApply.items():
                self.pixels[ledId] = e
                self.previousLedEffects[ledId] = e
            self.pixels.show()
#        else:
#            print("Skipping led update")

    def scaleByAmplitude(self, rgb, amplitude):
        maxValue = max(rgb[0], rgb[1], rgb[2])
        if maxValue <= 0:
            return rgb

        maxAmplitude = min(255 / maxValue, amplitude)
        newRgb = (int(rgb[0] * maxAmplitude), int(rgb[1] * maxAmplitude), int(rgb[2] * maxAmplitude))
        return newRgb
