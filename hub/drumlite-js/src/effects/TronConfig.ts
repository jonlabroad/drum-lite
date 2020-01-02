import BaseEffectConfig from "./FullEffectConfig";
import { HitType } from "../midi/HitType";
import ConstantAmplitude, { ConstantAmplitudeParams } from "../light/effect/amplitude/ConstantAmplitude";
import SingleColorEffect, { SingleColorEffectParams } from "../light/effect/color/SingleColorEffect";
import ConstantTargetsEffect, { ConstantTargetsEffectParams } from "../light/effect/positional/ConstantTargetsEffect";
import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";
import ConstantSpin, { ConstantSpinParams } from "../light/effect/positional/ConstantSpin";
import Sparkle, { SparkleParams } from "../light/effect/positional/Sparkle";
import Util from "../util/Util";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "../light/effect/amplitude/LinearFadeOutEffect";
import LinearColorTransition, { LinearColorTransitionParams } from "../light/effect/color/LinearColorTransition";
import SymmetricalLeds, { SymmetricalLedsParams } from "../light/effect/positional/SymmetricalLeds";
import FullEffectConfig from "./FullEffectConfig";
import RacerEffect, { RacerParameters } from "../light/effect/composed/RacerEffect";
import ColorTransitionFadeOutEffect, { ColorTransitionFadeOutParameters, ColorTransitionFadeOutOptions } from "../light/effect/composed/ColorTransitionFadeOut";
import SparklerEffect, { SparklerOptions, SparklerParameters } from "../light/effect/composed/Sparkler";

function arrayToRgb(arr: number[]) {
    return new RGB(arr[0], arr[1], arr[2]);
}

const allTargets = [
    EffectTarget.SNARE,
    EffectTarget.TOM1,
    EffectTarget.TOM2,
    EffectTarget.TOM3
];

const colors: Record<string, RGB> = {};
colors['tronBlueMain'] = arrayToRgb([15, 130, 210])
colors['tronOrangeMain'] = arrayToRgb([223, 116, 12])
colors['tronRedMain'] = arrayToRgb([200, 7, 4])

colors['tronBlueTrail'] = arrayToRgb([10, 70, 60])
colors['tronOrangeTrail'] = arrayToRgb([100, 40, 6])
colors['tronRedTrail'] = arrayToRgb([120, 0, 0])

colors['pinkPulse1'] = arrayToRgb([140, 40, 80])
colors['pinkPulse2'] = arrayToRgb([100, 40, 150])

colors['drumHit1a'] = arrayToRgb([255, 6, 63])
colors['drumHit1b'] = arrayToRgb([255, 6, 10])

// Green
colors['drumHit2a'] = arrayToRgb([200, 5, 8])
colors['drumHit2b'] = arrayToRgb([140, 0, 0])

// Red
colors['drumHit3a'] = arrayToRgb([243, 140, 2])
colors['drumHit3b'] = arrayToRgb([120, 40, 0])

// Sparkle
colors['sparkle1'] = arrayToRgb([250, 250, 250])
colors['sparkle2'] = arrayToRgb([128, 128, 128])
colors['sparkle3'] = arrayToRgb([40, 40, 40])

const ambientAmplitude = 0.1;
const kickAmplitudeMod = 5.0;
const ambientSpinPeriod = 1500;

export default class TronConfig extends FullEffectConfig {
    constructor() {
        super();

        const racerConfig = {
            racerAmplitude: ambientAmplitude,
            racerColor: colors['tronBlueMain'],
            trailAmplitude: ambientAmplitude,
            trailColor: colors['tronBlueTrail'],
            trailLength: 20,
            spinPeriod: ambientSpinPeriod,
            offset: 0,
            targets: [EffectTarget.SNARE],
            isAmbient: true,
            priority: EffectPriority.LOWEST,
            isModifier: false,
            startTime: 0,
            triggers: []
        };
        const racerParams = new RacerParameters(racerConfig);
        const racer1Snare = new RacerEffect("Racer1 Snare", racerParams);
        this.effects.push(racer1Snare);

        const racer2Snare = new RacerEffect("Racer2 Snare", new RacerParameters({
            ...racerConfig,
            racerColor: colors['tronOrangeMain'],
            trailColor: colors['tronOrangeTrail'],
            offset: 27
        }));
        this.effects.push(racer2Snare);

        const racer1Tom1 = new RacerEffect("Racer1 Tom1", new RacerParameters({
            ...racerConfig,
            trailLength: 13,
            targets: [EffectTarget.TOM1]
        }));
        this.effects.push(racer1Tom1);
        const racer2Tom1 = new RacerEffect("Racer1 Tom1", new RacerParameters({
            ...racerConfig,
            trailLength: 13,
            targets: [EffectTarget.TOM1],
            racerColor: colors['tronRedMain'],
            trailColor: colors['tronRedTrail'],
            offset: 18
        }));
        this.effects.push(racer2Tom1);

        const racer1Tom2 = new RacerEffect("Racer1 Tom2", new RacerParameters({
            ...racerConfig,
            trailLength: 12,
            targets: [EffectTarget.TOM2]
        }));
        this.effects.push(racer1Tom2);
        const racer2Tom2 = new RacerEffect("Racer1 Tom2", new RacerParameters({
            ...racerConfig,
            trailLength: 12,
            targets: [EffectTarget.TOM2],
            racerColor: colors['tronOrangeMain'],
            trailColor: colors['tronOrangeTrail'],
            offset: 16
        }));
        this.effects.push(racer2Tom2);

        const racer1Tom3 = new RacerEffect("Racer1 Tom3", new RacerParameters({
            ...racerConfig,
            trailLength: 13,
            targets: [EffectTarget.TOM3]
        }));
        this.effects.push(racer1Tom3);
        const racer2Tom3 = new RacerEffect("Racer1 Tom3", new RacerParameters({
            ...racerConfig,
            trailLength: 13,
            targets: [EffectTarget.TOM3],
            racerColor: colors['tronRedMain'],
            trailColor: colors['tronRedTrail'],
            offset: 18
        }));
        this.effects.push(racer2Tom3);

        const drumHitConfig: ColorTransitionFadeOutOptions = {
            amplitude: 1.0,
            startColor: colors['tronBlueMain'],
            endColor: colors['tronBlueTrail'],
            duration: 1000.0,
            triggers: [HitType.SNARE_HEAD, HitType.SNARE_RIM],
            targets: [EffectTarget.SNARE],
            isAmbient: false,
            priority: EffectPriority.HIGH,
            isModifier: false,
            startTime: 0
        };
        const snareHit = new ColorTransitionFadeOutEffect("Snare Hit", new ColorTransitionFadeOutParameters(drumHitConfig));
        this.effects.push(snareHit);

        const tom1Hit = new ColorTransitionFadeOutEffect("Tom1 Hit", new ColorTransitionFadeOutParameters({
            ...drumHitConfig,
            startColor: colors['drumHit1a'],
            endColor: colors['drumHit1b'],
            targets: [EffectTarget.TOM1],
            triggers: [HitType.TOM1]
        }));
        this.effects.push(tom1Hit);

        const tom2Hit = new ColorTransitionFadeOutEffect("Tom2 Hit", new ColorTransitionFadeOutParameters({
            ...drumHitConfig,
            startColor: colors['drumHit2a'],
            endColor: colors['drumHit2b'],
            targets: [EffectTarget.TOM2],
            triggers: [HitType.TOM2]
        }));
        this.effects.push(tom2Hit);

        const tom3Hit = new ColorTransitionFadeOutEffect("Tom3 Hit", new ColorTransitionFadeOutParameters({
            ...drumHitConfig,
            startColor: colors['drumHit3a'],
            endColor: colors['drumHit3b'],
            targets: [EffectTarget.TOM3],
            triggers: [HitType.TOM3]
        }));
        this.effects.push(tom3Hit);

        const sparkleConfig: SparklerOptions = {
            amplitude: 1.0,
            color1: colors['sparkle1'],
            color2: colors['sparkle3'],
            level1Targets: [EffectTarget.TOM1],
            level2Targets: [EffectTarget.SNARE, EffectTarget.TOM2],
            level3Targets: [EffectTarget.TOM3],
            level1Density: 15,
            level2Density: 5,
            level3Density: 3,
            duration: 1750,
            priority: EffectPriority.HIGH,
            isAmbient: false,
            triggers: [HitType.CRASH1_EDGE],
            isModifier: false,
            startTime: 0
        };
        const crash1Hit = new SparklerEffect("Sparkle Crash 1", new SparklerParameters({
            ...sparkleConfig
        }));
        this.effects.push(crash1Hit);

        const crash2Hit = new SparklerEffect("Sparkle Crash 2", new SparklerParameters({
            ...sparkleConfig,
            level1Targets: [EffectTarget.TOM2],
            level2Targets: [EffectTarget.TOM1, EffectTarget.TOM3],
            level3Targets: [EffectTarget.SNARE],
            triggers: [HitType.CRASH2_EDGE]
        }));
        this.effects.push(crash2Hit);

/*
        this.createPulseEffect("Kick Pulse", [HitType.KICK], allTargets, 300, kickAmplitudeMod);
    
        this.createDrumHitEffect("Snare Hit", [HitType.SNARE_HEAD, HitType.SNARE_XSTICK], [EffectTarget.SNARE], colors['tronBlueMain'], colors['tronBlueTrail']);
        this.createDrumHitEffect("Tom1 Hit", [HitType.TOM1], [EffectTarget.TOM1], colors['drumHit1a'], colors['drumHit1b']);
        this.createDrumHitEffect("Tom2 Hit", [HitType.TOM2], [EffectTarget.TOM2], colors['drumHit3a'], colors['drumHit3b']);
        this.createDrumHitEffect("Tom3 Hit", [HitType.TOM3], [EffectTarget.TOM3], colors['drumHit2a'], colors['drumHit2b']);

        this.createSparkle("Crash2 Sparkle", [HitType.CRASH2_EDGE], EffectTarget.TOM2, [EffectTarget.TOM1, EffectTarget.TOM3], [EffectTarget.SNARE], [15, 5, 3]);
        this.createSparkle("Crash1 Sparkle", [HitType.CRASH1_EDGE], EffectTarget.TOM1, [EffectTarget.TOM2, EffectTarget.SNARE], [EffectTarget.TOM3], [15, 5, 3]);
*/
        //fs.writeFileSync("tron.config", JSON.stringify(this.effects, null, 2));
        this.effects.forEach(e => e.init());

    }

/*
    createPulseEffect(name: string, hitTypes: HitType[], targets: EffectTarget[], duration: number, amplitude: number) {
        this.effects.push(
            [new PartialEffectConfig(name, hitTypes, [
                new LinearFadeOutEffect(new LinearFadeOutEffectParams(amplitude, duration)),
                new ConstantTargetsEffect(new ConstantTargetsEffectParams(targets)),
            ],
            EffectPriority.VERY_HIGH,
            false, true)]
        );

        this.effects.push(
            [new PartialEffectConfig(name, hitTypes, [
                new LinearFadeOutEffect(new LinearFadeOutEffectParams(amplitude / 20, duration)),
                new LinearColorTransition(new LinearColorTransitionParams(colors["pinkPulse1"], colors["pinkPulse2"], duration)),
                new SymmetricalLeds(new SymmetricalLedsParams(targets, 3, 3, 5)),
            ],
            EffectPriority.VERY_HIGH
            )]
        )
    }

    createDrumHitEffect(name: string, hitTypes: HitType[], targets: EffectTarget[], color1: RGB, color2: RGB) {
        const hitDuration = 750;
        this.effects.push(
                [new PartialEffectConfig(name, hitTypes, [
                    new LinearFadeOutEffect(new LinearFadeOutEffectParams(1, hitDuration)),
                    new LinearColorTransition(new LinearColorTransitionParams(color1, color2, hitDuration)),
                    new ConstantTargetsEffect(new ConstantTargetsEffectParams(targets))
                ],
                EffectPriority.HIGH)]
        );
    }

    createSparkle(name: string, hitTypes: HitType[], mainTarget: EffectTarget, targets2: EffectTarget[], target3: EffectTarget[], densities: number[]) {
        const sparkleDuration = 1750;
        const targetGroups = [[mainTarget], targets2, target3];
        targetGroups.forEach((tGroup, groupIndex) => {
            tGroup.forEach(target => {
                this.effects.push(
                    [new PartialEffectConfig(`${name} ${target.toString()}`, hitTypes, [
                        new ConstantAmplitude(new ConstantAmplitudeParams(1.0)),
                        new LinearColorTransition(new LinearColorTransitionParams(colors['sparkle1'], colors['sparkle3'], sparkleDuration)),
                        new Sparkle(new SparkleParams([target], densities[groupIndex], 1, sparkleDuration))
                    ],
                    EffectPriority.VERY_HIGH
                )]);
            });
        });
    }
*/
}
