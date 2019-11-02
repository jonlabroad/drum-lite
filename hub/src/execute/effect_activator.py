import copy
import time

class EffectActivator():
    def __init__(self, compiledEffects):
        self.compiledEffects = compiledEffects
        self.activeEffects = []

        self.ambientEffects = list(filter(lambda e: e[0].isAmbient, compiledEffects))
        for ae in self.ambientEffects:
            for el in ae:
                effectElement = el.clone()
                effectElement.t = effectElement.dt
                effectElement.noteTime = 0

                self.activeEffects.append(effectElement)

    def handleNote(self, hitType):
        noteTime = time.time()
        #self.removeActiveEffectsForTarget(hitType)
        effects = self.findNewEffects(hitType)
        for effect in effects:
            for effectElement in effect:
                effectElement = effectElement.clone()
                effectElement.t = noteTime + effectElement.dt
                effectElement.noteTime = noteTime
                self.activeEffects.append(effectElement)

        #self.activeEffects.sort(key=lambda ev: ev.t)

    def getCurrentActiveEffects(self):
        t = time.time()

        currentActive = list(filter(lambda e: (not e.isAmbient and e.t < t and e.t + e.duration > t) or (e.isAmbient and t % e.ambientDuration >= e.t and t % e.ambientDuration < (e.t + e.duration)), self.activeEffects))
        self.activeEffects = list(filter(lambda e: e.isAmbient or e.t + e.duration >= t, self.activeEffects))
        #print("getCurrentActiveEffects: " + str(time.time() - t))
        return currentActive

    def getActiveEffects(self):
        return self.activeEffects

    def findNewEffects(self, hitType):
        effects = list(filter(lambda e: hitType in e[0].hitTypes, self.compiledEffects))
        return effects

    def removeActiveEffectsForTarget(self, hitType):
        self.activeEffects = list(filter(lambda e: not hitType in e.hitTypes, self.activeEffects))
