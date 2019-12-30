import BaseEffectConfig from "./BaseEffectConfig";
import PartialEffectConfig from "./PartialEffectConfig";
import { HitType } from "../midi/HitType";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../light/effect/amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../light/effect/color/SingleColorEffect";
import ConstantTargetsEffect, { ConstantTargetsEffectParams } from "../light/effect/positional/ConstantTargetsEffect";
import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";
import ConstantSpin, { ConstantSpinParams } from "../light/effect/positional/ConstantSpin";
import Sparkle, { SparkleParams } from "../light/effect/positional/Sparkle";

export default class TestConfig extends BaseEffectConfig {
    constructor() {
        super();
        const allTargets = [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM2,
            EffectTarget.TOM3
        ];

        this.effects.push([new PartialEffectConfig(
            undefined,
            [HitType.SNARE_HEAD],
            [
                new ConstantAmplitude(new ConstantAmplitudeParams(1, 1000)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(128, 128, 128))),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams([
                    EffectTarget.SNARE
                ]))
            ])]
        );

        this.effects.push([new PartialEffectConfig(
            undefined,
            [HitType.TOM1],
            [
                new ConstantAmplitude(new ConstantAmplitudeParams(1, 1000)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(128, 128, 255))),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams([
                    EffectTarget.TOM1
                ]))
            ])]
        );

        this.effects.push([new PartialEffectConfig(
            undefined,
            [HitType.TOM2],
            [
                new ConstantAmplitude(new ConstantAmplitudeParams(1, 1000)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(128, 255, 128))),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams([
                    EffectTarget.TOM2
                ]))
            ])]
        );

        this.effects.push([new PartialEffectConfig(
            undefined,
            [HitType.TOM3],
            [
                new ConstantAmplitude(new ConstantAmplitudeParams(1.0, 1000)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(255, 128, 128))),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams([
                    EffectTarget.TOM3
                ]))
            ])]
        );

        this.effects.push([new PartialEffectConfig(
            undefined,
            [],
            [
                new ConstantSpin(new ConstantSpinParams(allTargets, 2000, 1, 2, 0, 1)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(0, 128, 128))),
            ], EffectPriority.LOWEST, true)]
        );

        const sparkleDuration = 1750;
        this.effects.push([new PartialEffectConfig(
            undefined,
            [HitType.CRASH1_EDGE], [
                new ConstantAmplitude(new ConstantAmplitudeParams(1.0)),
                new SingleColorEffect(new SingleColorEffectParams(new RGB(200,200,200))),
                new Sparkle(new SparkleParams([EffectTarget.TOM2], 15, 1, sparkleDuration))
            ],
            EffectPriority.VERY_HIGH
        )]);
    }
}
