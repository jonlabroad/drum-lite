import board
import neopixel

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.NEOPIXEL, 60*4, pixel_order=neopixel.RGBW, auto_write=False)

    def runEffects(self, effects):
        self.pixels.fill((0, 0, 0, 0))
        for effect in effects:
            for ledId in effect.ledPositions:
                self.pixels[ledId] = (effect.rgbw.r, effect.rgbw.g, effect.rgbw.b, effect.rgbw.w)

        self.pixels.show()