import FullConfig from "./FullConfig";
import RunnableEffect from "../../effect/RunnableEffect";
import RacerEffect, { RacerConfig } from "../Racer";
import { EffectTarget } from "../../config/EffectTarget";
import RGB from "../../light/RGB";
import Util from "../../util/Util";
import { EffectPriority } from "../../config/effects/EffectPriority";
import ColorHitEffect, { ColorHitConfig } from "../ColorHit";
import { HitType } from "../../midi/HitType";
import SparklerEffect, { SparklerConfig } from "../Sparkler";
import KickPulseEffect, { KickPulseConfig } from "../KickPulse";
import AmplitudeModifierEffect, { AmplitudeModifierConfig } from "../elements/modifiers/AmplitudeModifier";
import EffectModifier from "../elements/modifiers/EffectModifier";

const ambientPeriod = 2000;
const hitPeriod = 800;
const hitDecayAmp = 0.2;
const ambientAmp = 0.4;
const allTargets = [EffectTarget.SNARE, EffectTarget.TOM1, EffectTarget.TOM2, EffectTarget.TOM3];

const colors = {
    tronBlueMain: new RGB(15, 130, 210, ambientAmp),
    tronOrangeMain: new RGB(223, 116, 12, ambientAmp),
    tronRedMain: new RGB(200, 7, 4, ambientAmp),

    tronBlueTrail: new RGB(10, 70, 60, ambientAmp),
    tronOrangeTrail: new RGB(100, 40, 6, ambientAmp),
    tronRedTrail: new RGB(120, 0, 0, ambientAmp),

    pinkPulse1: new RGB(140, 40, 80, ambientAmp),
    pinkPulse2: new RGB(100, 40, 150, ambientAmp),

    drumHit1a: new RGB(255, 6, 63),
    drumHit1b: new RGB(255, 6, 10, hitDecayAmp),

    // Green
    drumHit2a: new RGB(200, 5, 8),
    drumHit2b: new RGB(140, 0, 0, hitDecayAmp),

    // Red
    drumHit3a: new RGB(243, 140, 2),
    drumHit3b: new RGB(120, 40, 0, hitDecayAmp),

    // Sparkle
    sparkle1: new RGB(250, 250, 250),
    sparkle2: new RGB(128, 128, 128),
    sparkle3: new RGB(40, 40, 40)
}

export default class Tron extends FullConfig {
    public getEffects(): { triggered: RunnableEffect[]; ambient: RunnableEffect[], modifiers: EffectModifier[] } {
        const ambients: RunnableEffect[] = [];
        const triggered: RunnableEffect[] = [];
        const modifiers: EffectModifier[] = [];

        ambients.push(...this.getAmbientEffects());
        triggered.push(...this.getTriggeredEffects());
        modifiers.push(...this.getModifiers());

        return {
            ambient: ambients,
            triggered,
            modifiers
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
                    EffectTarget.SNARE,
                ],
                colors: [
                    colors.tronBlueMain,
                    colors.tronBlueTrail
                ],
                period: hitPeriod,
                transition: "linear",
                priority: EffectPriority.VERY_HIGH,
                triggers: [
                    HitType.SNARE_HEAD,
                    HitType.SNARE_RIM
                ]
            })),

            new ColorHitEffect(new ColorHitConfig({
                targets: [
                    EffectTarget.TOM1,
                ],
                colors: [
                    colors.drumHit1a,
                    colors.drumHit1b
                ],
                period: hitPeriod,
                transition: "linear",
                priority: EffectPriority.VERY_HIGH,
                triggers: [
                    HitType.TOM1
                ]
            })),

            new ColorHitEffect(new ColorHitConfig({
                targets: [
                    EffectTarget.TOM2,
                ],
                colors: [
                    colors.drumHit2a,
                    colors.drumHit2b
                ],
                period: hitPeriod,
                transition: "linear",
                priority: EffectPriority.VERY_HIGH,
                triggers: [
                    HitType.TOM2
                ]
            })),

            new ColorHitEffect(new ColorHitConfig({
                targets: [
                    EffectTarget.TOM3,
                ],
                colors: [
                    colors.drumHit3a,
                    colors.drumHit3b
                ],
                period: hitPeriod,
                transition: "linear",
                priority: EffectPriority.VERY_HIGH,
                triggers: [
                    HitType.TOM3
                ]
            })),

            new SparklerEffect(new SparklerConfig({
                targetslevel1: [
                    EffectTarget.TOM1
                ],
                targetslevel2: [
                    EffectTarget.TOM2,
                    EffectTarget.SNARE
                ],
                targetslevel3: [
                    EffectTarget.TOM3
                ],
                densitylevel1: 15,
                densitylevel2: 5,
                densitylevel3: 3,
                duration: 1750,
                priority: EffectPriority.HIGHEST,
                triggers: [
                    HitType.CRASH1_EDGE
                ],
                colors: [
                    new RGB(255, 255, 255),
                    new RGB(0, 0, 0)
                ],
            })),

            new SparklerEffect(new SparklerConfig({
                targetslevel1: [
                    EffectTarget.TOM2
                ],
                targetslevel2: [
                    EffectTarget.TOM1,
                    EffectTarget.TOM3
                ],
                targetslevel3: [
                    EffectTarget.SNARE
                ],
                densitylevel1: 15,
                densitylevel2: 5,
                densitylevel3: 3,
                duration: 1750,
                priority: EffectPriority.HIGHEST,
                triggers: [
                    HitType.CRASH2_EDGE
                ],
                colors: [
                    new RGB(255, 255, 255),
                    new RGB(0, 0, 0)
                ],
            })),

            new KickPulseEffect(new KickPulseConfig({
                targets: allTargets,
                colors: [
                    colors.pinkPulse1,
                    new RGB(colors.pinkPulse2.r, colors.pinkPulse2.g, colors.pinkPulse2.b, 0.1)
                ],
                duration: 300,
                num: 3,
                offset: 0,
                length: 6,
                speed: 0,
                priority: EffectPriority.HIGHEST,
                transition: "linear",
                triggers: [
                    HitType.KICK
                ]
            }))
        ];
    }

    getModifiers() {
        return [
            new AmplitudeModifierEffect(new AmplitudeModifierConfig({
                targets: allTargets,
                triggers: [
                    HitType.KICK
                ],
                multiplier: 2.0,
                duration: 300,
                transition: "linear"
            }))
        ]
    }
}
