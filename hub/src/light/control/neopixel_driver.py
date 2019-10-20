import board
import neopixel
import time

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 300, brightness=1.0, bpp=3, auto_write=False)

    def runEffects(self, effectsMap):
        self.pixels.fill((0, 0, 0))
        
        for ledId in effectsMap:
            for effect in effectsMap[ledId]:
                r = max(0, effect.rgbw.r)
                g = max(0, effect.rgbw.g)
                b = max(0, effect.rgbw.b)
                #print(effect.rgbw.toString())
                amplitude = max(0, effect.amplitude)
                self.pixels[ledId] = (int(r*amplitude), int(g*amplitude), int(b*amplitude))

        self.pixels.show()
