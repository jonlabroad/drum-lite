import time
import copy
import platform

from light.effect.effect_priority_handler import EffectPriorityHandler
if platform.system() != 'Windows':
    from light.control.neopixel_driver import NeopixelDriver
from light.control.socketio_driver import SocketIoDriver

from light.effect.runtime_combiners.basic_combiner import BasicCombiner

class EffectRunner:
    def __init__(self, activator, sio):
        self.activator = activator
        self.priorityHandler = EffectPriorityHandler()
        self.sio = sio

    async def run(self):
        if platform.system() != 'Windows':
            driver = NeopixelDriver()
        else:
            driver = SocketIoDriver(self.sio)

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
            await driver.runEffects(mappedEffectsToRun)
            
            #print("Runner total: " + str(time.time() - startTime))
            #print("")

            await self.sio.sleep(0.01)