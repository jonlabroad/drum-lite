import copy
import time

class EffectActivator():
    def __init__(self, compiledEffects):
        self.compiledEffects = compiledEffects
        self.activeEffects = []

    def handleNote(self, hitType):
        noteTime = time.time()
        effects = self.findEffects(hitType)
        for effect in effects:
            for effectElement in effect:
                effectElement = copy.deepcopy(effectElement)
                effectElement.t = noteTime + effectElement.dt
                self.activeEffects.append(effectElement)

        self.activeEffects.sort(key=lambda ev: ev.t)

    def peekNext(self):
        return self.activeEffects[0] if len(self.activeEffects) > 0 else None

    def popNext(self):
        return self.activeEffects.pop(0)

    def getActiveEffects(self):
        return self.activeEffects

    def findEffects(self, hitType):
        effects = list(filter(lambda e: hitType in e[0].hitTypes, self.compiledEffects))
        return effects
