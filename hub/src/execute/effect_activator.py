import copy
import time

class EffectActivator():
    def __init__(self, compiledEffects):
        self.compiledEffects = compiledEffects
        self.activeEffects = []

        self.ambientEffects = list(filter(lambda e: e[0].isAmbient, compiledEffects))
        for ae in self.ambientEffects:
            for el in ae:
                effectElement = copy.deepcopy(el)
                effectElement.t = effectElement.dt
                effectElement.noteTime = 0
                self.activeEffects.append(effectElement)

    def handleNote(self, hitType):
        noteTime = time.time()
        #self.removeActiveEffectsForTarget(hitType)
        effects = self.findNewEffects(hitType)
        for effect in effects:
            for effectElement in effect:
                effectElement = copy.deepcopy(effectElement)
                effectElement.t = noteTime + effectElement.dt
                effectElement.noteTime = noteTime
                self.activeEffects.append(effectElement)

        #self.activeEffects.sort(key=lambda ev: ev.t)

    def getCurrentActiveEffects(self):
        t = time.time()
        testAmbient = list(filter(lambda e: e.isAmbient and t % 4.0 >= e.t and t % 4.0 < (e.t + e.duration), self.activeEffects))
        #print([len(testAmbient), len(self.activeEffects)])
        currentActive = list(filter(lambda e: (not e.isAmbient and t >= e.t) or (e.isAmbient and t % 4.0 >= e.t and t % 4.0 < (e.t + e.duration)), self.activeEffects))
        self.activeEffects = list(filter(lambda e: e.isAmbient or e.t + e.duration >= t, self.activeEffects))
        return currentActive

    def getActiveEffects(self):
        return self.activeEffects

    def findNewEffects(self, hitType):
        effects = list(filter(lambda e: hitType in e[0].hitTypes, self.compiledEffects))
        return effects

    def removeActiveEffectsForTarget(self, hitType):
        self.activeEffects = list(filter(lambda e: not hitType in e.hitTypes, self.activeEffects))
