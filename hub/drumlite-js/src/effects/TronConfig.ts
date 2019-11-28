import * as fs from 'fs';

import BaseEffectConfig from "./BaseEffectConfig";
import PartialEffectConfig from "./PartialEffectConfig";
import { HitType } from "../midi/HitType";
import ConstantAmplitude from "../light/effect/amplitude/ConstantAmplitude";
import SingleColorEffect from "../light/effect/color/SingleColorEffect";
import ConstantTargetsEffect from "../light/effect/positional/ConstantTargetsEffect";
import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";
import ConstantSpin from "../light/effect/positional/ConstantSpin";
import Sparkle from "../light/effect/positional/Sparkle";
import Util from "../util/Util";
import LinearFadeOutEffect from "../light/effect/amplitude/LinearFadeOutEffect";
import LinearColorTransition from "../light/effect/color/LinearColorTransition";
import SymmetricalLeds from "../light/effect/positional/SymmetricalLeds";
import JsonEffectConfig from '../light/effect/JsonEffectConfig';

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

colors['drumHit3a'] = arrayToRgb([243, 140, 2])
colors['drumHit3b'] = arrayToRgb([120, 40, 0])

// Sparkle
colors['sparkle1'] = arrayToRgb([250, 250, 250])
colors['sparkle2'] = arrayToRgb([128, 128, 128])
colors['sparkle3'] = arrayToRgb([40, 40, 40])

const ambientAmplitude = 0.1;
const kickAmplitudeMod = 5.0;
const ambientSpinPeriod = 1500;

export default class TronConfig extends BaseEffectConfig {
    constructor() {
        super();

        this.createRacer([EffectTarget.SNARE], 0, colors['tronBlueMain']);
        this.createTrail([EffectTarget.SNARE], -1, 20, colors['tronBlueTrail']);
    
        this.createRacer([EffectTarget.SNARE], 27, colors['tronOrangeMain']);
        this.createTrail([EffectTarget.SNARE], 26, 20, colors['tronOrangeTrail']);
    
        this.createRacer([EffectTarget.TOM1], 0, colors['tronBlueMain']);
        this.createTrail([EffectTarget.TOM1], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer([EffectTarget.TOM1], 17, colors['tronRedMain']);
        this.createTrail([EffectTarget.TOM1], 16, 13, colors['tronRedTrail']);

        this.createRacer([EffectTarget.TOM2], 0, colors['tronBlueMain']);
        this.createTrail([EffectTarget.TOM2], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer([EffectTarget.TOM2], 17, colors['tronOrangeMain']);
        this.createTrail([EffectTarget.TOM2], 16, 13, colors['tronOrangeTrail']);

        this.createRacer([EffectTarget.TOM3], 0, colors['tronBlueMain']);
        this.createTrail([EffectTarget.TOM3], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer([EffectTarget.TOM3], 17, colors['tronRedMain']);
        this.createTrail([EffectTarget.TOM3], 16, 13, colors['tronRedTrail']);

        this.createPulseEffect([HitType.KICK], allTargets, 300, kickAmplitudeMod);
    
        this.createDrumHitEffect([HitType.SNARE_HEAD, HitType.SNARE_XSTICK], [EffectTarget.SNARE], colors['tronBlueMain'], colors['tronBlueTrail']);
        this.createDrumHitEffect([HitType.TOM1], [EffectTarget.TOM1], colors['drumHit1a'], colors['drumHit1b']);
        this.createDrumHitEffect([HitType.TOM2], [EffectTarget.TOM2], colors['drumHit3a'], colors['drumHit3b']);
        this.createDrumHitEffect([HitType.TOM3], [EffectTarget.TOM3], colors['drumHit2a'], colors['drumHit2b']);

        this.createSparkle([HitType.CRASH2_EDGE], EffectTarget.TOM2, [EffectTarget.TOM1, EffectTarget.TOM3], [EffectTarget.SNARE], [15, 5, 3]);
        this.createSparkle([HitType.CRASH1_EDGE], EffectTarget.TOM1, [EffectTarget.TOM2, EffectTarget.SNARE], [EffectTarget.TOM3], [15, 5, 3]);

        //fs.writeFileSync("tron.config", JSON.stringify(this.effects, null, 2));
    }

    createRacer(targets: EffectTarget[], offset: number, color: RGB) {
        this.effects.push(
            new PartialEffectConfig([], [
                    new ConstantAmplitude(ambientAmplitude),
                    new SingleColorEffect(color),
                    new ConstantSpin(targets, ambientSpinPeriod, 1000, 1, offset, 1.0),
                ], EffectPriority.LOWEST, true
            )
        );
    }

    createTrail(targets: EffectTarget[], offset: number, length: number, color: RGB) {
        for (let n of Util.range(0, length)) {
            // TEST JSON config
            const constantAmplitudeConfig: JsonEffectConfig = {
                className: "ConstantAmplitude",
                typeName: "Constant Amplitude",
                parameters: {
                    amplitude: ambientAmplitude
                }
            };
            const constAmplitudeEffect = new ConstantAmplitude();
            constAmplitudeEffect.fromJson(JSON.stringify(constantAmplitudeConfig));

            this.effects.push(
                new PartialEffectConfig([], [
                    constAmplitudeEffect,
                    new SingleColorEffect(color),
                    new ConstantSpin(targets, ambientSpinPeriod, 1000, 1, offset - n, 1.0),
                ], EffectPriority.LOWEST, true
                )
            );
        }
    }

    createPulseEffect(hitTypes: HitType[], targets: EffectTarget[], duration: number, amplitude: number) {
        this.effects.push(
            new PartialEffectConfig(hitTypes, [
                new LinearFadeOutEffect(duration, amplitude),
                new ConstantTargetsEffect(targets),
            ],
            EffectPriority.VERY_HIGH,
            false, true)
        );

        this.effects.push(
            new PartialEffectConfig(hitTypes, [
                new LinearFadeOutEffect(duration, amplitude / 20),
                new LinearColorTransition(colors["pinkPulse1"], colors["pinkPulse2"], duration),
                new SymmetricalLeds(targets, 3, 3, 5),
            ],
            EffectPriority.VERY_HIGH
            )
        )
    }

    createDrumHitEffect(hitTypes: HitType[], targets: EffectTarget[], color1: RGB, color2: RGB) {
        const hitDuration = 750;
        this.effects.push(
                    new PartialEffectConfig(hitTypes, [
                    new LinearFadeOutEffect(hitDuration, 1),
                    new LinearColorTransition(color1, color2, hitDuration),
                    new ConstantTargetsEffect(targets)
                ],
                EffectPriority.HIGH)
        );
    }

    createSparkle(hitTypes: HitType[], mainTarget: EffectTarget, targets2: EffectTarget[], target3: EffectTarget[], densities: number[]) {
        const sparkleDuration = 1750;
        const targetGroups = [[mainTarget], targets2, target3];
        targetGroups.forEach((tGroup, groupIndex) => {
            tGroup.forEach(target => {
                this.effects.push(
                    new PartialEffectConfig(hitTypes, [
                        new ConstantAmplitude(1.0),
                        new LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                        new Sparkle([target], densities[groupIndex], 1, sparkleDuration)
                    ],
                    EffectPriority.VERY_HIGH
                ));
            });
        });
    }
}
