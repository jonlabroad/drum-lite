import board
import neopixel

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.NEOPIXEL, 60*4, pixel_order=neopixel.RGBW)

    def runEffect(self, effect):
        for ledId in effect.ledPositions:
            self.pixels[ledId] = (effect.rgbw.r, effect.rgbw.g, effect.rgbw.b, effect.rgbw.w)

        self.pixels.show()