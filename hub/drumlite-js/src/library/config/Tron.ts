import FullConfig from "./FullConfig";
import RunnableEffect from "../../effect/RunnableEffect";
import RacerEffect, { RacerConfig } from "../Racer";
import { EffectTarget } from "../../config/EffectTarget";
import RGB from "../../light/RGB";
import Util from "../../util/Util";
import { EffectPriority } from "../../config/effects/EffectPriority";
import ColorHitEffect, { ColorHitConfig } from "../ColorHit";
import { HitType } from "../../midi/HitType";

const colors = {
    tronBlueMain: Util.arrayToRgb([15, 130, 210]),
    tronOrangeMain: Util.arrayToRgb([223, 116, 12]),
    tronRedMain: Util.arrayToRgb([200, 7, 4]),

    tronBlueTrail: Util.arrayToRgb([10, 70, 60]),
    tronOrangeTrail: Util.arrayToRgb([100, 40, 6]),
    tronRedTrail: Util.arrayToRgb([120, 0, 0]),

    pinkPulse1: Util.arrayToRgb([140, 40, 80]),
    pinkPulse2: Util.arrayToRgb([100, 40, 150]),

    drumHit1a: Util.arrayToRgb([255, 6, 63]),
    drumHit1b: Util.arrayToRgb([255, 6, 10]),

    // Green
    drumHit2a: Util.arrayToRgb([200, 5, 8]),
    drumHit2b: Util.arrayToRgb([140, 0, 0]),

    // Red
    drumHit3a: Util.arrayToRgb([243, 140, 2]),
    drumHit3b: Util.arrayToRgb([120, 40, 0]),

    // Sparkle
    sparkle1: Util.arrayToRgb([250, 250, 250]),
    sparkle2: Util.arrayToRgb([128, 128, 128]),
    sparkle3: Util.arrayToRgb([40, 40, 40])
}

const ambientPeriod = 2000;

export default class Tron extends FullConfig {
    public getEffects(): { triggered: RunnableEffect[]; ambient: RunnableEffect[] } {
        const ambients: RunnableEffect[] = [];
        const triggered: RunnableEffect[] = [];

        ambients.push(...this.getAmbientEffects());
        triggered.push(...this.getTriggeredEffects());

        return {
            ambient: ambients,
            triggered
        }
    }

    private getAmbientEffects() {
        
        const effects: RunnableEffect[] = [];
        effects.push(...this.createRacer(colors.tronBlueMain, colors.tronBlueTrail, 20, EffectTarget.SNARE, 0));
        effects.push(...this.createRacer(colors.tronOrangeMain, colors.tronOrangeTrail, 20, EffectTarget.SNARE, 27));

        effects.push(...this.createRacer(colors.tronBlueMain, colors.tronBlueTrail, 13, EffectTarget.TOM1, 0));
        effects.push(...this.createRacer(colors.tronRedMain, colors.tronRedTrail, 13, EffectTarget.TOM1, 18));

        effects.push(...this.createRacer(colors.tronBlueMain, colors.tronBlueTrail, 11, EffectTarget.TOM2, 0));
        effects.push(...this.createRacer(colors.tronOrangeMain, colors.tronOrangeTrail, 11, EffectTarget.TOM2, 17));

        effects.push(...this.createRacer(colors.tronBlueMain, colors.tronBlueTrail, 13, EffectTarget.TOM3, 0));
        effects.push(...this.createRacer(colors.tronRedMain, colors.tronRedTrail, 13, EffectTarget.TOM3, 17));

/*
        effects.push(new RacerEffect(new RacerConfig({
            targets: [
                EffectTarget.SNARE
            ],
            color: colors.tronRedMain,
            period: ambientPeriod,
            num: 1,
            offset: 25,
            length: 1,
            priority: EffectPriority.LOW,
            transition: "linear"
        })));
        effects.push(new RacerEffect(new RacerConfig({
            targets: [
                EffectTarget.SNARE
            ],
            color: colors.tronRedTrail,
            period: ambientPeriod,
            num: 1,
            offset: ,
            length: 20,
            priority: EffectPriority.LOWEST,
            transition: "linear"
        })));
*/
        return effects;
    }

    private createRacer(headColor: RGB, trailColor: RGB, trailLength: number, target: EffectTarget, offset: number): RunnableEffect[] {
        return [
            new RacerEffect(new RacerConfig({
                targets: [
                    target
                ],
                color: headColor,
                period: ambientPeriod,
                num: 1,
                offset: offset,
                length: 1,
                priority: EffectPriority.LOW,
                transition: "linear"
            })),    
            new RacerEffect(new RacerConfig({
                targets: [
                    target
                ],
                color: trailColor,
                period: ambientPeriod,
                num: 1,
                offset: -1 + offset,
                length: trailLength,
                priority: EffectPriority.LOWEST,
                transition: "linear"
            }))
        ]
    }

    private getTriggeredEffects(): RunnableEffect[] {
        return [
            new ColorHitEffect(new ColorHitConfig({
                targets: [
                    EffectTarget.TOM2,
                ],
                colors: [
                    new RGB(60, 200, 50),
                    new RGB(0, 0, 0)
                ],
                period: 1000,
                transition: "linear",
                triggers: [
                    HitType.TOM2
                ]
            }))
        ];
    }
}
