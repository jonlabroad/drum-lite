import PartialEffect, { EffectParameters } from "./PartialEffect";

export default class EffectModifier<T extends EffectParameters> extends PartialEffect<T> {
    public isModifier: boolean;
    
    constructor(type: string, className: string, params: T) {
        super(type, className, params, 0);
        this.isModifier = true;
    }
}
