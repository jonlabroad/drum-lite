import { EffectParameter, EffectParameters, defaultMillisecondRange, EffectOptions } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";
import LinearColorTransition, { LinearColorTransitionParams } from "../color/LinearColorTransition";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "../amplitude/LinearFadeOutEffect";
import ConstantTargetsEffect, { ConstantTargetsEffectParams } from "../positional/ConstantTargetsEffect";
import SymmetricalLeds, { SymmetricalLedsParams } from "../positional/SymmetricalLeds";

export interface TronPulseOptions extends EffectOptions {
    amplitude: number
    color1: RGB,
    color2: RGB
    targets: EffectTarget[]
    duration: number
}

export class TronPulseParameters extends EffectParameters {
    effectName = "TronPulse";
    typeName = "Composed";

    constructor(config: TronPulseOptions) {
        super(config);
        this.params.amplitude = new EffectParameter<number>("Amplitude", config.amplitude);
        this.params.color1 = new EffectParameter<RGB>("Color 1", config.color1, {type: "rgb"});
        this.params.color2 = new EffectParameter<RGB>("Color 2", config.color2, {type: "rgb"});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", config.targets, {type: "target", isArray: true});
        this.params.duration = new EffectParameter<number>("Duration", config.duration);
        this.params.priority.options.isHidden = false;
        this.params.priority.val = config.priority;
        this.params.isModifier.options.isHidden = false;
        this.params.isModifier.val = config.isModifier;
    }
}

export default class TronPulseEffect extends EffectConfig<TronPulseParameters> {
    constructor(name: string, params: TronPulseParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.children.push(...this.create().map(e => new EffectConfig(this.name, this.params, e)));
        super.init();
    }

    create(): SingleEffect[] {
        const params = this.params.params;
        return [
            new SingleEffect(this.name, [
                new LinearFadeOutEffect(new LinearFadeOutEffectParams(params.amplitude.val, params.duration.val)),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams(params.targets.val)),
            ])
            ,
            new SingleEffect(this.name, [
                new LinearFadeOutEffect(new LinearFadeOutEffectParams(params.amplitude.val, params.duration.val)),
                new LinearColorTransition(new LinearColorTransitionParams(params.color1.val, params.color2.val, params.duration.val)),
                new SymmetricalLeds(new SymmetricalLedsParams(params.targets.val, 3, 3, 5)),
            ])
        ];
    }
}