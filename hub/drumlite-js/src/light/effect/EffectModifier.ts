import PartialEffect from "./PartialEffect";

export default class EffectModifier extends PartialEffect {
    public isModifier: boolean;
    
    constructor(type: string, className: string) {
        super(type, className, 0);
        this.isModifier = true;
    }
}
