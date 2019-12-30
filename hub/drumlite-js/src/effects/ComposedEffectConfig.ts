import { HitType } from "../midi/HitType";
import PartialEffect from "../light/effect/PartialEffect";
import { EffectPriority } from "../effect/EffectPriority";
import ComposedEffect from "../light/effect/ComposedEffect";
import PartialEffectConfig from "./PartialEffectConfig";

export default class ComposedEffectConfig extends PartialEffectConfig {
    composedEffect: ComposedEffect<any>;

    constructor(name: string | undefined, effect: ComposedEffect<any>, priority: EffectPriority = EffectPriority.MEDIUM, isAmbient: boolean = false, isModifier: boolean = false) {
        super(name, [], [], priority, isAmbient, isModifier);
        this.composedEffect = effect;
    }

    public getEffects(): PartialEffect<any>[][] {
        return this.composedEffect.getEffects();
    }
}
