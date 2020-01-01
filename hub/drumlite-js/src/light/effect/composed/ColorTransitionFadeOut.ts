import { EffectParameter, EffectParameters, defaultMillisecondRange, EffectOptions } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";
import { HitType } from "../../../midi/HitType";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "../amplitude/LinearFadeOutEffect";
import LinearColorTransition, { LinearColorTransitionParams } from "../color/LinearColorTransition";
import ConstantTargetsEffect, { ConstantTargetsEffectParams } from "../positional/ConstantTargetsEffect";
import { EffectPriority } from "../../../effect/EffectPriority";

export interface ColorTransitionFadeOutOptions extends EffectOptions {
    amplitude: number,
    startColor: RGB,
    endColor: RGB,
    duration: number,
    targets: EffectTarget[]
}

export class ColorTransitionFadeOutParameters extends EffectParameters {
    effectName = "Color Transition Fade Out";
    typeName = "Composed";

    constructor(config: ColorTransitionFadeOutOptions) {
        super(config);
        this.params.amplitude = new EffectParameter<number>("Amplitude", config.amplitude);
        this.params.startColor = new EffectParameter<RGB>("Color 1", config.startColor, {type: "rgb"});
        this.params.endColor = new EffectParameter<RGB>("Color 2", config.endColor, {type: "rgb"});
        this.params.duration = new EffectParameter<number>("Duration", config.duration, {range: defaultMillisecondRange});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", config.targets, {type: "target", isArray: true});
        this.params.triggers = new EffectParameter<HitType[]>("Triggers", config.triggers, {type: "hittype", isArray: true});
        this.params.priority.options.isHidden = false;
        this.params.priority.val = config.priority;
    }
}

export default class ColorTransitionFadeOutEffect extends EffectConfig<ColorTransitionFadeOutParameters> {
    constructor(name: string, params: ColorTransitionFadeOutParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.children.push(new EffectConfig(this.name, this.params, this.create()));
        super.init();
    }

    create(): SingleEffect {
        const params = this.params.params;
        return new SingleEffect(this.name, [
            new LinearFadeOutEffect(new LinearFadeOutEffectParams(params.amplitude.val, params.duration.val)),
            new LinearColorTransition(new LinearColorTransitionParams(params.startColor.val, params.endColor.val, params.duration.val)),
            new ConstantTargetsEffect(new ConstantTargetsEffectParams(params.targets.val))
        ], params.isAmbient.val, params.priority.val
        );
    }
}