import { HitType } from "../midi/HitType";
import PartialEffect from "../light/effect/PartialEffect";
import { EffectPriority } from "../effect/EffectPriority";

export default class PartialEffectConfig {
    triggerEvents: HitType[];
    effect: PartialEffect<any>[];
    priority: number;
    isAmbient: boolean;
    isModifier: boolean;

    constructor(triggerEvents: HitType[], effect: PartialEffect<any>[], priority: EffectPriority = EffectPriority.MEDIUM, isAmbient: boolean = false, isModifier: boolean = false) {
        this.triggerEvents = triggerEvents;
        this.effect = effect;
        this.priority = priority;
        this.isAmbient = isAmbient;
        this.isModifier = isModifier;
    }
}
