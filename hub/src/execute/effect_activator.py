import copy
import time

class EffectActivator():
    def __init__(self, compiledEffects):
        self.compiledEffects = compiledEffects
        self.activeEffects = []

    def handleNote(self, hitType):
        noteTime = time.time()
        self.removeActiveEffectsForTarget(hitType)
        effects = self.findNewEffects(hitType)
        for effect in effects:
            for effectElement in effect:
                effectElement = copy.deepcopy(effectElement)
                effectElement.t = noteTime + effectElement.dt
                self.activeEffects.append(effectElement)

        self.activeEffects.sort(key=lambda ev: ev.t)

    def getCurrentActiveEffects(self):
        t = time.time()
        currentActive = list(filter(lambda e: t >= e.t, self.activeEffects))
        self.activeEffects = list(filter(lambda e: e.t + e.duration >= t, self.activeEffects))
        return currentActive

    def getActiveEffects(self):
        return self.activeEffects

    def findNewEffects(self, hitType):
        effects = list(filter(lambda e: hitType in e[0].hitTypes, self.compiledEffects))
        return effects

    def removeActiveEffectsForTarget(self, hitType):
        self.activeEffects = list(filter(lambda e: not hitType in e.hitTypes, self.activeEffects))
