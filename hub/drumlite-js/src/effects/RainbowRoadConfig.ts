import { EffectTarget } from "../light/effect/EffectTarget";
import RGB from "../light/RGB";
import { EffectPriority } from "../effect/EffectPriority";
import FullEffectConfig from "./FullEffectConfig";
import SpinningColorsEffect, { SpinningColorsParameters } from "../light/effect/composed/SpinningColors";
import MarioStarEffect, { MarioStarParameters } from "../light/effect/composed/MarioStar";

function arrayToRgb(arr: number[]) {
    return new RGB(arr[0], arr[1], arr[2]);
}

const allTargets = [
    EffectTarget.SNARE,
    EffectTarget.TOM1,
    EffectTarget.TOM2,
    EffectTarget.TOM3
];


const ambientAmplitude = 0.1;
const kickAmplitudeMod = 5.0;
const ambientSpinPeriod = 1500;

export default class RainbowRoadConfig extends FullEffectConfig {
    constructor() {
        super();

        const colors = [
            new RGB(239, 13, 13),
            new RGB(240, 150, 23),
            new RGB(241, 242, 26),
            new RGB(51, 244, 35),
            new RGB(23, 102, 237),
            new RGB(46, 46, 247)];
/*
        const duration = 2000;
        this.effects.push(
            new NColorTransitionEffect("Rainbow Flow", new NColorTransitionEffectParameters({
                amplitude: 0.6,
                duration: duration,
                colors: colors,
                targets: allTargets,
                startTime: 0,
                isAmbient: true,
                isModifier: false,
                priority: EffectPriority.LOWEST,
                triggers: []
            }))
        );
*/

        this.effects.push(
            new SpinningColorsEffect("Spinning Rainbow", new SpinningColorsParameters({
                amplitude: 0.7,
                lengthPercentage: 100,
                colors: colors,
                symmetry: 1,
                colorPeriod: 2000,
                positionalOffset: 0,
                targets: [EffectTarget.SNARE],
                priority: EffectPriority.LOWEST,
                startTime: 0,
                isAmbient: true,
                isModifier: false,
                triggers: [],
                minTriggerVelocity: 0
        })));

        this.effects.push(
            new MarioStarEffect("Mario Star", new MarioStarParameters({
                starColors: [new RGB(128, 128, 128), new RGB(250, 250, 250)],
                targets: [EffectTarget.SNARE],
                isAmbient: true,
                isJit: true,
                priority: EffectPriority.HIGH
            }))
        );

        this.effects.forEach(e => e.init());
    }
}
