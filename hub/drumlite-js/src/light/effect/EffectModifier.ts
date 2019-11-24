import PartialEffect from "./PartialEffect";

export default class EffectModifier extends PartialEffect {
    public isModifier: boolean;
    
    constructor() {
        super(0);
        this.isModifier = true;
    }
}
