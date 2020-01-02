import { HitType } from "../midi/HitType";
import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "../light/effect/amplitude/LinearFadeOutEffect";
import LinearColorTransition, { LinearColorTransitionParams } from "../light/effect/color/LinearColorTransition";
import SymmetricalLeds, { SymmetricalLedsParams } from "../light/effect/positional/SymmetricalLeds";
import FullEffectConfig from "./FullEffectConfig";
import RacerEffect, { RacerParameters } from "../light/effect/composed/RacerEffect";
import ColorTransitionFadeOutEffect, { ColorTransitionFadeOutParameters, ColorTransitionFadeOutOptions } from "../light/effect/composed/ColorTransitionFadeOut";
import SparklerEffect, { SparklerOptions, SparklerParameters } from "../light/effect/composed/Sparkler";
import TronPulseEffect, { TronPulseOptions, TronPulseParameters } from "../light/effect/composed/TronPulse";
import SingleEffect from "./SingleEffect";
import EffectConfig from "./EffectConfig";

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

        const kickConfig: TronPulseOptions = {
            amplitude: kickAmplitudeMod,
            color1: colors['pinkPulse1'],
            color2: colors['pinkPulse2'],
            targets: allTargets,
            duration: 300,
            isModifier: true,
            isAmbient: false,
            priority: EffectPriority.HIGH,
            triggers: [HitType.KICK],
            startTime: 0
        };
        const kickHit = new TronPulseEffect("Kick Pulse", new TronPulseParameters(kickConfig));
        this.effects.push(kickHit);

        this.effects.push(
            new EffectConfig("Kick Pulse Lights", new TronPulseParameters({
                ...kickConfig,
                isModifier: false
            }),
            new SingleEffect("Kick Pulse Lights", [
                new LinearFadeOutEffect(new LinearFadeOutEffectParams(kickConfig.amplitude / 20, kickConfig.duration)),
                new LinearColorTransition(new LinearColorTransitionParams(kickConfig.color1, kickConfig.color2, kickConfig.duration)),
                new SymmetricalLeds(new SymmetricalLedsParams(kickConfig.targets, 3, 3, 5)),
            ]))
        );
        this.effects.forEach(e => e.init());
    }
}
