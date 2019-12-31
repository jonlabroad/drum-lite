import { EffectParameter, EffectParameters, defaultMillisecondRange } from "../PartialEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../color/SingleColorEffect";
import ConstantSpin, { ConstantSpinParams } from "../positional/ConstantSpin";
import Util from "../../../util/Util";
import EffectConfig from "../../../effects/EffectConfig";
import SingleEffect from "../../../effects/SingleEffect";

export class RacerParameters extends EffectParameters {
    effectName = "Racer";
    typeName = "Composed";

    constructor(
        racerAmplitude: number = 1.0,
        racerColor: RGB = new RGB(),
        trailAmplitude: number = 0.5,
        trailColor: RGB = new RGB(),
        trailLength: number = 20,
        spinPeriod: number = 1000,
        offset: number = 0,
        targets: EffectTarget[]
        ) {
        super();
        this.params.racerAmplitude = new EffectParameter<number>("Racer Amplitude", racerAmplitude);
        this.params.racerColor = new EffectParameter<RGB>("Racer Color", racerColor);
        this.params.trailAmplitude = new EffectParameter<number>("Trail Amplitude", trailAmplitude);
        this.params.trailColor = new EffectParameter<RGB>("Trail Color", trailColor);
        this.params.trailLength = new EffectParameter<number>("Trail Length", trailLength);
        this.params.spinPeriod = new EffectParameter<number>("Spin Period", spinPeriod, {range: defaultMillisecondRange});
        this.params.offset = new EffectParameter<number>("Offset", offset, {range: {min: 0, max: 100, inc: 1}});
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, {type: "target", isArray: true});
    }
}

export default class RacerEffect extends EffectConfig<RacerParameters> {
    constructor(name: string, params: RacerParameters){
        super(name, params);
    }

    public init(): void {
        this.children = [];
        this.children.push(new EffectConfig(name, new EffectParameters(), this.createRacer(this.params.params.offset.val)));
        this.createTrail();
    }

    createRacer(offset: number): SingleEffect {
        return new SingleEffect(this.name, [
                    new ConstantAmplitude(new ConstantAmplitudeParams(this.params.params.racerAmplitude.val)),
                    new SingleColorEffect(new SingleColorEffectParams(this.params.params.racerColor.val)),
                    new ConstantSpin(new ConstantSpinParams(this.params.params.targets.val, this.params.params.spinPeriod.val, 1, 1, offset, this.params.params.racerAmplitude.val)),
                ]
        );
    }

    createTrail() {
        const { params } = this.params;
        const baseOffset = params.offset.val - 1;
        for (let n of Util.range(0, params.trailLength.val)) {
            this.children.push(
                new EffectConfig(`${this.name} ${n}`, new EffectParameters(),
                    new SingleEffect(this.name, [
                        new ConstantAmplitude(new ConstantAmplitudeParams(params.trailAmplitude.val)),
                        new SingleColorEffect(new SingleColorEffectParams(params.trailColor.val)),
                        new ConstantSpin(new ConstantSpinParams(params.targets.val, params.spinPeriod.val, 1, 1, baseOffset - n, params.trailAmplitude.val)),
                    ])
                )
            )
        }
    }
}