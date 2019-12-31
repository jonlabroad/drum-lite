import PartialEffect, { EffectParameters } from "../light/effect/PartialEffect";
import { EffectPriority } from "../effect/EffectPriority";

export default class SingleEffect {
    name: string = "";
    partialEffects: PartialEffect<any>[] = [];
    isAmbient: boolean;
    priority: EffectPriority;

    constructor(name: string, partialEffects: PartialEffect<any>[], isAmbient = false, priority = EffectPriority.MEDIUM) {
        this.name = name;
        this.partialEffects = partialEffects;
        this.isAmbient = isAmbient;
        this.priority = priority;
    }
}
