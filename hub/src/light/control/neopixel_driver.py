import board
import neopixel
import time
import json

ledsOnStrip = 160

class NeopixelDriver:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, ledsOnStrip, brightness=1.0, bpp=3, auto_write=False)

    def drive(message):
        inLeds = json.loads(message)
        print(inLeds)
        for ledStr in inLeds:
            inRgb = inLeds[ledStr]
            self.pixels[int(ledStr)] = (inRgb[0], inRgb[1], inRgb[2])
        self.pixels.show()
