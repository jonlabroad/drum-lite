import PartialEffect, { EffectParameters } from "../light/effect/PartialEffect";
import { EffectPriority } from "../effect/EffectPriority";

export default class SingleEffect {
    name: string = "";
    partialEffects: PartialEffect<any>[] = [];

    constructor(name: string, partialEffects: PartialEffect<any>[]) {
        this.name = name;
        this.partialEffects = partialEffects;
    }
}
