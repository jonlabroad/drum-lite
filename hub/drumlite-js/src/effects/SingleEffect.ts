import PartialEffect, { EffectParameters } from "../light/effect/PartialEffect";

export default class SingleEffect {
    name: string = "";
    partialEffects: PartialEffect<any>[] = [];

    constructor(name: string, partialEffects: PartialEffect<any>[]) {
        this.name = name;
        this.partialEffects = partialEffects;
    }
}
