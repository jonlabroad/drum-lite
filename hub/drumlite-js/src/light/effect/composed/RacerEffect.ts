import PartialEffect, { EffectParameter, EffectParameters, defaultMillisecondRange } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ComposedEffect from "../ComposedEffect";
import RGB from "../../RGB";
import { EffectTarget } from "../EffectTarget";
import PartialEffectConfig from "../../../effects/PartialEffectConfig";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../color/SingleColorEffect";
import ConstantSpin, { ConstantSpinParams } from "../positional/ConstantSpin";
import { EffectPriority } from "../../../effect/EffectPriority";
import Util from "../../../util/Util";

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
        super(0);
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

export default class RacerEffect extends ComposedEffect<RacerParameters> {
    constructor(name: string, params: RacerParameters, isModifier = false, dt: number = 0){
        super(name, params, isModifier, dt);

        this.addChildren(this.createRacer(this.params.params.offset.val).getEffects());
        this.createTrail();
    }

    createRacer(offset: number) {
        return new PartialEffectConfig(this.name, [], [
                    new ConstantAmplitude(new ConstantAmplitudeParams(this.params.params.racerAmplitude.val)),
                    new SingleColorEffect(new SingleColorEffectParams(this.params.params.racerColor.val)),
                    new ConstantSpin(new ConstantSpinParams(this.params.params.targets.val, this.params.params.spinPeriod.val, 1, 1, offset, this.params.params.racerAmplitude.val)),
                ], EffectPriority.LOWEST, true
        );
    }

    createTrail() {
        const { params } = this.params;
        const baseOffset = params.offset.val - 1;
        for (let n of Util.range(0, params.trailLength.val)) {
            this.addChildren(
                new PartialEffectConfig(this.name, [], [
                    new ConstantAmplitude(new ConstantAmplitudeParams(params.trailAmplitude.val)),
                    new SingleColorEffect(new SingleColorEffectParams(params.trailColor.val)),
                    new ConstantSpin(new ConstantSpinParams(params.targets.val, params.spinPeriod.val, 1, 1, baseOffset - n, params.trailAmplitude.val)),
                ], EffectPriority.LOWEST, true
                ).getEffects()
            );
        }
    }
}