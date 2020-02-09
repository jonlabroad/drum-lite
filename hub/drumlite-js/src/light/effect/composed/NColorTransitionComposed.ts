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
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import NColorTransition, { NColorTransitionParams } from "../color/NColorTransition";

export interface NColorTransitionEffectOptions extends EffectOptions {
    amplitude: number,
    colors: RGB[],
    duration: number,
    targets: EffectTarget[],
    offset: number
}

export class NColorTransitionEffectParameters extends EffectParameters {
    effectName = "N-Color Transition";
    typeName = "Composed";

    constructor(config: NColorTransitionEffectOptions) {
        super(config);
        this.params.amplitude = new EffectParameter<number>("Amplitude", config.amplitude);
        this.params.colors = new EffectParameter<RGB[]>("Colors", config.colors, {type: "rgb", isArray: true});
        this.params.duration = new EffectParameter<number>("Duration", config.duration, {range: defaultMillisecondRange});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", config.targets, {type: "target", isArray: true});
        this.params.triggers = new EffectParameter<HitType[]>("Triggers", config.triggers, {type: "hittype", isArray: true});
        this.params.offset = new EffectParameter<number>("Offset", config.offset);
        this.params.priority.options.isHidden = false;
        this.params.priority.val = config.priority;
    }
}

export default class NColorTransitionEffect extends EffectConfig<NColorTransitionEffectParameters> {
    constructor(name: string, params: NColorTransitionEffectParameters){
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
                new ConstantAmplitude(new ConstantAmplitudeParams(params.amplitude.val, params.duration.val)),
                new NColorTransition(new NColorTransitionParams(params.colors.val, params.duration.val, params.offset.val)),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams(params.targets.val)),
        ]);
    }
}