import board
import neopixel
import time
import asyncio

class LedTest:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 55, brightness=1.0, bpp=3, auto_write=False)

    def main(self):
        self.pixels.fill((128, 0, 0))
        self.pixels.show()
        return

        ledStep = 5
        timestep = 0.1
        intensity = 255
        duration = intensity/ledStep * timestep
        print("Duration: " + str(duration) + " sec")
        while intensity >= 0:
            startTime = time.time()
            for l in range(0, 60):
                self.pixels[l] = (0, intensity, 0)
            intensity = intensity - ledStep
            
            self.pixels.show()
            
            endTime = time.time()
            print("Step: " + str(endTime - startTime))


LedTest().main()
while(True):
    time.sleep(1.0)