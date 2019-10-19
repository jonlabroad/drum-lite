import board
import neopixel
import time

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 300, brightness=1.0, bpp=3, auto_write=False)

    def runEffects(self, effects):
        self.pixels.fill((0, 0, 0))
        #self.pixels.fill((1, 1, 1))
        #self.pixels.fill((1, 1, 1))
        #self.pixels.show()
        #return
        for effect in effects:
            r = max(0, effect.rgbw.r)
            g = max(0, effect.rgbw.g)
            b = max(0, effect.rgbw.b)
            print(effect.rgbw.toString())
            amplitude = max(0, effect.amplitude)
            for ledId in effect.ledPositions:
                self.pixels[ledId] = (int(r*amplitude), int(g*amplitude), int(b*amplitude))

        self.pixels.show()
