import board
import neopixel
import time

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 300, brightness=1.0, bpp=3, pixel_order=neopixel.RGB, auto_write=False)

    def runEffects(self, effects):
        self.pixels.fill((0, 0, 0))
        #self.pixels.fill((1, 1, 1))
        #self.pixels.fill((1, 1, 1))
        #self.pixels.show()
        #return
        for effect in effects:
            for ledId in effect.ledPositions:
                self.pixels[ledId] = (int(effect.rgbw.r*effect.amplitude), int(effect.rgbw.g*effect.amplitude), int(effect.rgbw.b*effect.amplitude))

        self.pixels.show()
