import { HitType } from "../midi/HitType";
import PartialEffect from "../light/effect/PartialEffect";
import { EffectPriority } from "../effect/EffectPriority";

export default class PartialEffectConfig {
    name: string = "Untitled";
    triggerEvents: HitType[];
    effect: PartialEffect<any>[];
    priority: number;
    isAmbient: boolean;
    isModifier: boolean;

    constructor(name: string | undefined, triggerEvents: HitType[], effect: PartialEffect<any>[], priority: EffectPriority = EffectPriority.MEDIUM, isAmbient: boolean = false, isModifier: boolean = false) {
        this.name = name || "Untitled";
        this.triggerEvents = triggerEvents;
        this.effect = effect;
        this.priority = priority;
        this.isAmbient = isAmbient;
        this.isModifier = isModifier;
    }
}
