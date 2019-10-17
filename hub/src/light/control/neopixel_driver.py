import board
import neopixel
import time

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 300, bpp=3, pixel_order=neopixel.RGB, auto_write=False)

    def runEffects(self, effects):
#        self.pixels.fill((0, 0, 0))
#        self.pixels[0] = ((10, 0, 0))
#        self.pixels[1] = ((0, 10, 0))
#        self.pixels[2] = ((0, 0, 10))
#        self.pixels[3] = ((10, 10, 10))
        self.pixels.fill((0, 0, 0))
        for effect in effects:
            for ledId in effect.ledPositions:
                self.pixels[ledId] = (effect.rgbw.r, effect.rgbw.g, effect.rgbw.b)

        self.pixels.show()
