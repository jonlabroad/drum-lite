import PartialEffect, { EffectParameters } from "./PartialEffect";

export default class EffectModifier<T extends EffectParameters> extends PartialEffect<T> {
    public isModifier: boolean;
    
    constructor(params: T) {
        super(params, 0);
        this.isModifier = true;
    }
}
