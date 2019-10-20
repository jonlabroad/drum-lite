from light.effect.effect_priority import EffectPriority

class EffectConfig:
    def __init__(self, triggerEvents, effect, priority=EffectPriority.MEDIUM):
        self.triggerEvents = triggerEvents
        self.effect = effect
        self.priority = priority

