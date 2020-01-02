import { EffectParameter, EffectParameters, defaultMillisecondRange, EffectOptions } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";
import { EffectPriority } from "../../../effect/EffectPriority";
import Sparkle, { SparkleParams } from "../positional/Sparkle";
import LinearColorTransition, { LinearColorTransitionParams } from "../color/LinearColorTransition";

export interface SparklerOptions extends EffectOptions {
    amplitude: number
    color1: RGB,
    color2: RGB
    level1Targets: EffectTarget[]
    level2Targets: EffectTarget[]
    level3Targets: EffectTarget[]
    level1Density: number
    level2Density: number
    level3Density: number
    duration: number
}

export class SparklerParameters extends EffectParameters {
    effectName = "Sparkler";
    typeName = "Composed";

    constructor(config: SparklerOptions) {
        super(config);
        this.params.amplitude = new EffectParameter<number>("Amplitude", config.amplitude);
        this.params.color1 = new EffectParameter<RGB>("Color 1", config.color1);
        this.params.color2 = new EffectParameter<RGB>("Color 2", config.color2);
        this.params.level1Targets = new EffectParameter<EffectTarget[]>("Targets Level 1", config.level1Targets, {type: "target", isArray: true});
        this.params.level2Targets = new EffectParameter<EffectTarget[]>("Targets Level 2", config.level2Targets, {type: "target", isArray: true});
        this.params.level3Targets = new EffectParameter<EffectTarget[]>("Targets Level 3", config.level3Targets, {type: "target", isArray: true});
        this.params.level1Density = new EffectParameter<number>("Density Level 1", config.level1Density);
        this.params.level2Density = new EffectParameter<number>("Density Level 2", config.level2Density);
        this.params.level3Density = new EffectParameter<number>("Density Level 3", config.level3Density);
        this.params.duration = new EffectParameter<number>("Duration", config.duration);
        this.params.priority.options.isHidden = false;
        this.params.priority.val = config.priority;
        this.params.isAmbient.options.isHidden = false;
        this.params.isAmbient.val = config.isAmbient;
    }
}

export default class SparklerEffect extends EffectConfig<SparklerParameters> {
    constructor(name: string, params: SparklerParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.children.push(...this.create().map(e => new EffectConfig(this.name, this.params, e)));
        super.init();
    }

    create(): SingleEffect[] {
        const params = this.params.params;
        const effects: SingleEffect[] = [];
        const densities = [params.level1Density.val, params.level2Density.val, params.level3Density.val];
        [params.level1Targets.val, params.level2Targets.val, params.level3Targets.val].forEach((tGroup: EffectTarget[], groupIndex) => {
            effects.push(...tGroup.map(target => {
                return new SingleEffect(this.name, [
                            new ConstantAmplitude(new ConstantAmplitudeParams(1.0)),
                            new LinearColorTransition(new LinearColorTransitionParams(params.color1.val, params.color2.val, params.duration.val)),
                            new Sparkle(new SparkleParams([target], densities[groupIndex], 1, params.duration.val))
                        ],
                        params.isAmbient.val, params.priority.val
                    )
            }))
        });
        return effects;
    }
}