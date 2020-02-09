import { EffectParameter, EffectParameters, defaultMillisecondRange, EffectOptions, defaultLedRange, defaultPercentageRange, defaultSymmetryRange } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../color/SingleColorEffect";
import ConstantSpin, { ConstantSpinParams } from "../positional/ConstantSpin";
import Util from "../../../util/Util";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";
import { EffectPriority } from "../../../effect/EffectPriority";
import NColorTransitionEffect from "./NColorTransitionComposed";
import NColorTransition, { NColorTransitionParams } from "../color/NColorTransition";
import ConstantTargetsEffect, { ConstantTargetsEffectParams } from "../positional/ConstantTargetsEffect";
import SymmetricalLeds, { SymmetricalLedsParams } from "../positional/SymmetricalLeds";
import { HitType } from "../../../midi/HitType";
import LEDSelector from "../../LEDSelector";

export class MarioStarOptions extends EffectOptions {
    constructor() {
        super();
    }

    amplitude: number = 1.0
    period: number = 2000.0
    starColors: RGB[] = []
    colorPeriod: number = 500
    targets: EffectTarget[] = []
}
export const defaultMarioStarOptions = new MarioStarOptions();

export class MarioStarParameters extends EffectParameters {
    effectName = "Mario Star";
    typeName = "Composed";

    constructor(config: Partial<MarioStarOptions>) {
        super({ ...defaultMarioStarOptions, ...config});
        const fullConfig = { ...defaultMarioStarOptions, ...config};
        this.params.amplitude = new EffectParameter<number>("Amplitude", fullConfig.amplitude);
        this.params.period = new EffectParameter<number>("Period", fullConfig.period, {range: defaultMillisecondRange});
        this.params.starColors = new EffectParameter<RGB[]>("Star Colors", fullConfig.starColors, {type: "rgb", isArray: true});
        this.params.starColorPeriod = new EffectParameter<number>("Star Color Period", fullConfig.colorPeriod, {range: defaultMillisecondRange});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", fullConfig.targets, {type: "target", isArray: true});
        this.params.triggers.options.isHidden = false;
        this.params.isAmbient.options.isHidden = false;
    }
}

export default class MarioStarEffect extends EffectConfig<MarioStarParameters> {
    constructor(name: string, params: MarioStarParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.create();
        super.init();
    }

    create() {
        const { params } = this.params;
        this.children.push(
            new EffectConfig("Star Main", new EffectParameters(),
                new SingleEffect("Star Main", [
                    new ConstantAmplitude(new ConstantAmplitudeParams(params.amplitude.val)),
                    new ConstantSpin(new ConstantSpinParams(params.targets.val, params.period.val, 1, 1, 0)),
                    //new NColorTransition(new NColorTransitionParams(params.starColors.val, params.starColorPeriod.val))
                    new SingleColorEffect(new SingleColorEffectParams(new RGB(230, 230, 230)))
                ])
        ));
    }
}