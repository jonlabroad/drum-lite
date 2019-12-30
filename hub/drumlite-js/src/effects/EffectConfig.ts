import PartialEffect, { EffectParameters } from "../light/effect/PartialEffect";
import SingleEffect from "./SingleEffect";

export default class EffectConfig<T extends EffectParameters> {
    name: string;
    params: EffectParameters;
    effect?: SingleEffect = undefined;
    
    children: EffectConfig<any>[] = [];

    constructor(name: string, params: T, effect: SingleEffect | undefined = undefined) {
        this.name = name;
        this.params = params;
        this.effect = effect;
    }
}
