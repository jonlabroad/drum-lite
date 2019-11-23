import BaseEffectConfig from "./BaseEffectConfig";
import PartialEffectConfig from "./PartialEffectConfig";
import { HitType } from "../midi/HitType";
import ConstantAmplitude from "../light/effect/amplitude/ConstantAmplitude";
import SingleColorEffect from "../light/effect/color/SingleColorEffect";
import ConstantTargetsEffect from "../light/effect/positional/ConstantTargetsEffect";
import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";

export default class TestConfig extends BaseEffectConfig {
    constructor() {
        super();
        this.effects.push(new PartialEffectConfig(
            [HitType.SNARE_HEAD],
            [
                new ConstantAmplitude(1, 1000),
                new SingleColorEffect(new RGB(128, 128, 128)),
                new ConstantTargetsEffect([
                    EffectTarget.SNARE
                ])
            ])
        );

        this.effects.push(new PartialEffectConfig(
            [HitType.TOM1],
            [
                new ConstantAmplitude(1, 1000),
                new SingleColorEffect(new RGB(128, 128, 255)),
                new ConstantTargetsEffect([
                    EffectTarget.TOM1
                ])
            ])
        );

        this.effects.push(new PartialEffectConfig(
            [HitType.TOM2],
            [
                new ConstantAmplitude(1, 1000),
                new SingleColorEffect(new RGB(128, 255, 128)),
                new ConstantTargetsEffect([
                    EffectTarget.TOM2
                ])
            ])
        );

        this.effects.push(new PartialEffectConfig(
            [HitType.TOM3],
            [
                new ConstantAmplitude(1.0, 1000),
                new SingleColorEffect(new RGB(255, 128, 128)),
                new ConstantTargetsEffect([
                    EffectTarget.TOM3
                ])
            ])
        );

        this.effects.push(new PartialEffectConfig(
            [],
            [
                new ConstantAmplitude(1, 1000),
                new SingleColorEffect(new RGB(128, 128, 128)),
                new ConstantTargetsEffect([
                    EffectTarget.TOM1
                ])
            ], EffectPriority.LOWEST, true)
        );
    }
}
