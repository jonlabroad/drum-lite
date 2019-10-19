import time

from light.control.neopixel_driver import NeopixelDriver

class EffectRunner:
    def __init__(self, activator):
        self.activator = activator

    def run(self):
        driver = NeopixelDriver()
        while (True):
            activeEffects = self.activator.getCurrentActiveEffects()
            driver.runEffects(activeEffects)
                
            time.sleep(0.001)