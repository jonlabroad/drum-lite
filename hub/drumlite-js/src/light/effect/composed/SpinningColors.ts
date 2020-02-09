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

export interface SpinningColorsOptions extends EffectOptions {
    amplitude: number
    lengthPercentage: number
    colors: RGB[]
    symmetry: number
    colorPeriod: number,
    positionalOffset: number,
    targets: EffectTarget[],
    priority: EffectPriority,
}

export class SpinningColorsParameters extends EffectParameters {
    effectName = "Spinning Colors";
    typeName = "Composed";

    constructor(config: SpinningColorsOptions) {
        super(config);
        this.params.amplitude = new EffectParameter<number>("Amplitude", config.amplitude);
        this.params.lengthPercentage = new EffectParameter<number>("Length %", config.lengthPercentage, {range: defaultPercentageRange});
        this.params.colors = new EffectParameter<RGB[]>("Colors", config.colors, {type: "rgb", isArray: true});
        this.params.colorPeriod = new EffectParameter<number>("Color Period", config.colorPeriod, {range: defaultMillisecondRange});
        this.params.positionalOffset = new EffectParameter<number>("Positional Offset", config.positionalOffset);
        this.params.symmetry = new EffectParameter<number>("Symmetry", config.symmetry, {range: defaultSymmetryRange});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", config.targets, {type: "target", isArray: true});
        this.params.triggers = new EffectParameter<HitType[]>("Triggers", config.triggers, {type: "hittype", isArray: true});
        this.params.priority.val = config.priority;
    }
}

export default class SpinningColorsEffect extends EffectConfig<SpinningColorsParameters> {
    constructor(name: string, params: SpinningColorsParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.createTrail();
        super.init();
    }

    createTrail() {
        const { params } = this.params;
        params.targets.val.forEach((target: EffectTarget) => {
            const targetLeds = new LEDSelector().getAllTargetPositions(target);
            const trailLength = Math.ceil(targetLeds.length * params.lengthPercentage.val / 100.0);
            const colorOffsetLen = params.colorPeriod.val / trailLength;
            for (let nLed of Util.range(0, trailLength)) {
                this.children.push(
                    new EffectConfig(`${this.name} ${nLed}`, this.params,
                        new SingleEffect(this.name, [
                            new ConstantAmplitude(new ConstantAmplitudeParams(params.amplitude.val)),
                            new NColorTransition(new NColorTransitionParams(params.colors.val, params.colorPeriod.val, colorOffsetLen * nLed)),
                            new SymmetricalLeds(new SymmetricalLedsParams([target], params.symmetry.val, 1, nLed))
                        ])
                    )
                )
            }
        })
    }
}