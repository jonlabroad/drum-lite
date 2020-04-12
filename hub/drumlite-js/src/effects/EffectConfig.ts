import PartialEffect, { EffectParameters } from "../light/effect/PartialEffect";
import SingleEffect from "./SingleEffect";

export default class EffectConfig<T extends EffectParameters> {
    static readonly globalParams = ["isAmbient", "priority", "isModifier", "triggers", "isJit", "minTriggerVelocity"]
    
    name: string;
    params: EffectParameters;
    effect?: SingleEffect = undefined;
    
    children: EffectConfig<any>[] = [];

    constructor(name: string, params: T, effect: SingleEffect | undefined = undefined) {
        this.name = name;
        this.params = params;
        this.effect = effect;

        this.params.params.isAmbient.options.isHidden = false;
    }

    public init() {
        this.setGlobalParams();
    }

    public setGlobalParam(paramName: string, value: any) {
        const oldParam = this.params.params[paramName];
        if (oldParam) {
            oldParam.val = value;
        }
        this.children.forEach(child => {
            child.setGlobalParam(paramName, value);
        })
    }

    private setGlobalParams() {
        EffectConfig.globalParams.forEach(gp => {
            const existingParam = this.params.params[gp];
            if (existingParam) {
                this.setGlobalParam(gp, existingParam.val);
            }
        });
    }
}
