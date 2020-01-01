import { EffectParameter, EffectParameters, defaultMillisecondRange, EffectOptions } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../color/SingleColorEffect";
import ConstantSpin, { ConstantSpinParams } from "../positional/ConstantSpin";
import Util from "../../../util/Util";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";
import { EffectPriority } from "../../../effect/EffectPriority";

export interface RacerOptions extends EffectOptions {
    racerAmplitude: number
    racerColor: RGB,
    trailAmplitude: number,
    trailColor: RGB,
    trailLength: number,
    spinPeriod: number,
    offset: number,
    targets: EffectTarget[]
    priority: EffectPriority
}

export class RacerParameters extends EffectParameters {
    effectName = "Racer";
    typeName = "Composed";

    constructor(config: RacerOptions) {
        super(config);
        this.params.racerAmplitude = new EffectParameter<number>("Racer Amplitude", config.racerAmplitude);
        this.params.racerColor = new EffectParameter<RGB>("Racer Color", config.racerColor);
        this.params.trailAmplitude = new EffectParameter<number>("Trail Amplitude", config.trailAmplitude);
        this.params.trailColor = new EffectParameter<RGB>("Trail Color", config.trailColor);
        this.params.trailLength = new EffectParameter<number>("Trail Length", config.trailLength);
        this.params.spinPeriod = new EffectParameter<number>("Spin Period", config.spinPeriod, {range: defaultMillisecondRange});
        this.params.offset = new EffectParameter<number>("Offset", config.offset, {range: {min: 0, max: 100, inc: 1}});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", config.targets, {type: "target", isArray: true});
        this.params.priority.val = config.priority;
    }
}

export default class RacerEffect extends EffectConfig<RacerParameters> {
    constructor(name: string, params: RacerParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.children.push(new EffectConfig(this.name, this.params, this.createRacer()));
        this.createTrail();
        super.init();
    }

    createRacer(): SingleEffect {
        return new SingleEffect(this.name, [
                    new ConstantAmplitude(new ConstantAmplitudeParams(this.params.params.racerAmplitude.val)),
                    new SingleColorEffect(new SingleColorEffectParams(this.params.params.racerColor.val)),
                    new ConstantSpin(new ConstantSpinParams(this.params.params.targets.val, this.params.params.spinPeriod.val, 1, 1, this.params.params.offset.val, this.params.params.racerAmplitude.val)),
                ], this.params.params.isAmbient.val, this.params.params.priority.val
        );
    }

    createTrail() {
        const { params } = this.params;
        const baseOffset = params.offset.val - 1;
        for (let n of Util.range(0, params.trailLength.val)) {
            this.children.push(
                new EffectConfig(`${this.name} ${n}`, this.params,
                    new SingleEffect(this.name, [
                        new ConstantAmplitude(new ConstantAmplitudeParams(params.trailAmplitude.val)),
                        new SingleColorEffect(new SingleColorEffectParams(params.trailColor.val)),
                        new ConstantSpin(new ConstantSpinParams(params.targets.val, params.spinPeriod.val, 1, 1, baseOffset - n, params.trailAmplitude.val)),
                    ], this.params.params.isAmbient.val, this.params.params.priority.val)
                )
            )
        }
    }
}