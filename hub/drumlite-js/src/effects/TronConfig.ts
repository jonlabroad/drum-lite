import BaseEffectConfig from "./FullEffectConfig";
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
import Util from "../util/Util";
import LinearFadeOutEffect, { LinearFadeOutEffectParams } from "../light/effect/amplitude/LinearFadeOutEffect";
import LinearColorTransition, { LinearColorTransitionParams } from "../light/effect/color/LinearColorTransition";
import SymmetricalLeds, { SymmetricalLedsParams } from "../light/effect/positional/SymmetricalLeds";
import RacerEffect, { RacerParameters } from "../light/effect/composed/RacerEffect";
import ComposedEffectConfig from "./ComposedEffectConfig";
import FullEffectConfig from "./FullEffectConfig";

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

export default class TronConfig extends FullEffectConfig {
    constructor() {
        super();

        const racer1Snare = new RacerEffect("Racer1 Snare",
            new RacerParameters(ambientAmplitude, colors['tronBlueMain'], ambientAmplitude, colors['tronBlueTrail'], 20, ambientSpinPeriod, 0, [EffectTarget.SNARE])
        );
        this.effects.push(racer1Snare);
        //this.effects.push(racer1Snare.children.map(childEffect => new PartialEffectConfig("Racer1", [], childEffect, EffectPriority.LOWEST, true, false)));

/*
        const racer2Snare = new RacerEffect("Racer2 Snare",
            new RacerParameters(ambientAmplitude, colors['tronOrangeMain'], ambientAmplitude, colors['tronOrangeTrail'], 20, ambientSpinPeriod, 27, [EffectTarget.SNARE])
        );
        this.effects.push(racer2Snare.children.map(childEffect => new PartialEffectConfig("Racer1", [], childEffect, EffectPriority.LOWEST, true, false)));
*/

        //console.log(this.effects.map(e => JSON.stringify(e, null, 2)));
/*
        this.createRacer("Racer2 Snare", [EffectTarget.SNARE], 27, colors['tronOrangeMain']);
        this.createTrail("Racer2 Trail Snare", [EffectTarget.SNARE], 26, 20, colors['tronOrangeTrail']);
    
        this.createRacer("Racer1 Tom1", [EffectTarget.TOM1], 0, colors['tronBlueMain']);
        this.createTrail("Racer1 Trail Tom1", [EffectTarget.TOM1], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer("Racer2 Tom1", [EffectTarget.TOM1], 17, colors['tronRedMain']);
        this.createTrail("Racer2 Trail Tom1", [EffectTarget.TOM1], 16, 13, colors['tronRedTrail']);

        this.createRacer("Racer1 Tom2", [EffectTarget.TOM2], 0, colors['tronBlueMain']);
        this.createTrail("Racer1 Trail Tom2", [EffectTarget.TOM2], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer("Racer2 Tom2", [EffectTarget.TOM2], 17, colors['tronOrangeMain']);
        this.createTrail("Racer2 Trail Tom2", [EffectTarget.TOM2], 16, 13, colors['tronOrangeTrail']);

        this.createRacer("Racer1 Tom3", [EffectTarget.TOM3], 0, colors['tronBlueMain']);
        this.createTrail("Racer1 Trail Tom3", [EffectTarget.TOM3], -1, 13, colors['tronBlueTrail']);
    
        this.createRacer("Racer2 Tom3", [EffectTarget.TOM3], 17, colors['tronRedMain']);
        this.createTrail("Racer2 Trail Tom3", [EffectTarget.TOM3], 16, 13, colors['tronRedTrail']);

        this.createPulseEffect("Kick Pulse", [HitType.KICK], allTargets, 300, kickAmplitudeMod);
    
        this.createDrumHitEffect("Snare Hit", [HitType.SNARE_HEAD, HitType.SNARE_XSTICK], [EffectTarget.SNARE], colors['tronBlueMain'], colors['tronBlueTrail']);
        this.createDrumHitEffect("Tom1 Hit", [HitType.TOM1], [EffectTarget.TOM1], colors['drumHit1a'], colors['drumHit1b']);
        this.createDrumHitEffect("Tom2 Hit", [HitType.TOM2], [EffectTarget.TOM2], colors['drumHit3a'], colors['drumHit3b']);
        this.createDrumHitEffect("Tom3 Hit", [HitType.TOM3], [EffectTarget.TOM3], colors['drumHit2a'], colors['drumHit2b']);

        this.createSparkle("Crash2 Sparkle", [HitType.CRASH2_EDGE], EffectTarget.TOM2, [EffectTarget.TOM1, EffectTarget.TOM3], [EffectTarget.SNARE], [15, 5, 3]);
        this.createSparkle("Crash1 Sparkle", [HitType.CRASH1_EDGE], EffectTarget.TOM1, [EffectTarget.TOM2, EffectTarget.SNARE], [EffectTarget.TOM3], [15, 5, 3]);
*/
        //fs.writeFileSync("tron.config", JSON.stringify(this.effects, null, 2));
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
