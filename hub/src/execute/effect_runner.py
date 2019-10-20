import time

from light.effect.effect_priority_handler import EffectPriorityHandler
from light.control.neopixel_driver import NeopixelDriver

class EffectRunner:
    def __init__(self, activator):
        self.activator = activator
        self.priorityHandler = EffectPriorityHandler()

    def run(self):
        driver = NeopixelDriver()
        while (True):
            activeEffects = self.activator.getCurrentActiveEffects()

            self.priorityHandler.clear()
            for activeEffect in activeEffects:
                self.priorityHandler.addLedEffect(activeEffect)
            
            mappedEffectsToRun = self.priorityHandler.getLeds()

            #print(mappedEffectsToRun.get(3))
            driver.runEffects(mappedEffectsToRun)
                
            time.sleep(0.001)