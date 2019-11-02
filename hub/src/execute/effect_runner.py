import time
import copy

from light.effect.effect_priority_handler import EffectPriorityHandler
from light.control.neopixel_driver import NeopixelDriver
from light.effect.runtime_combiners.basic_combiner import BasicCombiner

class EffectRunner:
    def __init__(self, activator):
        self.activator = activator
        self.priorityHandler = EffectPriorityHandler()

    def run(self):
        driver = NeopixelDriver()
        combiner = BasicCombiner()
        while (True):
            startTime = time.time()

            activeEffects = self.activator.getCurrentActiveEffects()

            priorityStartTime = time.time()
            self.priorityHandler.clear()
            for activeEffect in activeEffects:
                self.priorityHandler.addLedEffect(activeEffect)
            
            mappedEffectsToRun = self.priorityHandler.getLeds()
            #print("Priority: " + str(time.time() - priorityStartTime))

            combinerStart = time.time()
            combiner.combine(mappedEffectsToRun)
            #print("Combiner: " + str(time.time() - combinerStart))

            #print(mappedEffectsToRun.get(3))
            driver.runEffects(mappedEffectsToRun)
            
            #print("Runner total: " + str(time.time() - startTime))
            #print("")

            time.sleep(0.01)