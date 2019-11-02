from light.effect_config import EffectConfig
from midi.hit_type import HitType
from light.rgbw import RGBW
from light.effect.amplitude_effects.linear_fade_out_effect import LinearFadeOutEffect
from light.effect.amplitude_effects.constant_amplitude import ConstantAmplitude
from light.effect.amplitude_effects.cubic_fade_out_effect import CubicFadeOutEffect
from light.effect.color_effects.single_color_effect import SingleColorEffect
from light.effect.color_effects.linear_color_transition import LinearColorTransition
from light.effect.color_effects.triple_linear_color_transition import TripleLinearColorTransition
from light.effect.color_effects.triple_cubic_color_transition import TripleCubicColorTransition
from light.effect.translation_effects.constant_targets_effect import ConstantTargetsEffect
from light.effect.translation_effects.symmetrical_leds import SymmetricalLeds
from light.effect.translation_effects.sparkle import Sparkle
from light.effect.translation_effects.cubic_single_spiral import CubicSingleSpiral
from light.effect.translation_effects.constant_spin import ConstantSpin
from light.effect.effect_target_type import EffectTargetType
from light.effect.effect_priority import EffectPriority

allTargets = [
    EffectTargetType.SNARE,
    EffectTargetType.TOM1,
    EffectTargetType.TOM2,
    EffectTargetType.TOM3
]

def arrayToRgb(arr):
    return RGBW(arr[0], arr[1], arr[2])

colors = {}
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

# Green
colors['drumHit2a'] = arrayToRgb([200, 5, 8])
colors['drumHit2b'] = arrayToRgb([140, 0, 0])

# Red
colors['drumHit3a'] = arrayToRgb([243, 140, 2])
colors['drumHit3b'] = arrayToRgb([120, 40, 0])

colors['drumHit3a'] = arrayToRgb([243, 140, 2])
colors['drumHit3b'] = arrayToRgb([120, 40, 0])

# Sparkle
colors['sparkle1'] = arrayToRgb([250, 250, 250])
colors['sparkle2'] = arrayToRgb([128, 128, 128])
colors['sparkle3'] = arrayToRgb([40, 40, 40])

ambientAmplitude = 0.1
kickAmplitudeMod = 5.0
ambientSpinPeriod = 1.5

def createRacer(effects, targets, offset, color):
    effects.append(
        EffectConfig([], [
                ConstantAmplitude(ambientAmplitude),
                SingleColorEffect(color),
                #CubicSingleSpiral(allTargets, 2.0, 6),
                ConstantSpin(targets, ambientSpinPeriod, 1.0, 1, offset, 1.0),
            ], EffectPriority.LOWEST, isAmbient=True
        )
    )

def createTrail(effects, targets, offset, length, color):
    for n in range(0, length):
        effects.append(
            EffectConfig([], [
                ConstantAmplitude(ambientAmplitude / 2),
                SingleColorEffect(color),
                ConstantSpin(targets, ambientSpinPeriod, 1.0, 1, offset - n, 1.0),
            ], EffectPriority.LOWEST, isAmbient=True
            )
        )

def createPulseEffect(effects, hitTypes, targets, duration, amplitude):
    effects.append(
        EffectConfig(hitTypes, [
            LinearFadeOutEffect(duration, amplitude),
            #TripleCubicColorTransition(RGBW(128, 0, 0), RGBW(128, 0, 0), RGBW(128, 0, 0), 0.5),
            ConstantTargetsEffect(targets),
        ],
    EffectPriority.VERY_HIGH,
    isModifier= True)
    )

    effects.append(
        EffectConfig(hitTypes, [
            LinearFadeOutEffect(duration, amplitude / 20),
            LinearColorTransition(colors["pinkPulse1"], colors["pinkPulse2"], duration),
            SymmetricalLeds(targets, 3, 3, offset=5),
        ],
        EffectPriority.VERY_HIGH
        )
    )

def createDrumHitEffect(effects, hitTypes, targets, color1, color2):
    hitDuration = 0.75
    effects.append(
        EffectConfig(hitTypes, [
                LinearFadeOutEffect(hitDuration, 1.0),
                LinearColorTransition(color1, color2, hitDuration),
                ConstantTargetsEffect(targets)
            ],
            EffectPriority.HIGH
        )
    )

def tronConfig():
    effects = []

    createRacer(effects, [EffectTargetType.SNARE], 0, colors['tronBlueMain'])
    createTrail(effects, [EffectTargetType.SNARE], -1, 20, colors['tronBlueTrail'])

    createRacer(effects, [EffectTargetType.SNARE], 27, colors['tronOrangeMain'])
    createTrail(effects, [EffectTargetType.SNARE], 26, 20, colors['tronOrangeTrail'])

    createRacer(effects, [EffectTargetType.TOM1], 0, colors['tronBlueMain'])
    createTrail(effects, [EffectTargetType.TOM1], -1, 13, colors['tronBlueTrail'])

    createRacer(effects, [EffectTargetType.TOM1], 17, colors['tronRedMain'])
    createTrail(effects, [EffectTargetType.TOM1], 16, 13, colors['tronRedTrail'])

    createRacer(effects, [EffectTargetType.TOM2], 0, colors['tronBlueMain'])
    createTrail(effects, [EffectTargetType.TOM2], -1, 13, colors['tronBlueTrail'])

    createRacer(effects, [EffectTargetType.TOM2], 17, colors['tronOrangeMain'])
    createTrail(effects, [EffectTargetType.TOM2], 16, 13, colors['tronOrangeTrail'])
    
    createRacer(effects, [EffectTargetType.TOM3], 0, colors['tronBlueMain'])
    createTrail(effects, [EffectTargetType.TOM3], -1, 13, colors['tronBlueTrail'])

    createRacer(effects, [EffectTargetType.TOM3], 17, colors['tronRedMain'])
    createTrail(effects, [EffectTargetType.TOM3], 16, 13, colors['tronRedTrail'])

    createPulseEffect(effects, [HitType.KICK], allTargets, 0.3, kickAmplitudeMod)

    createDrumHitEffect(effects, [HitType.SNARE_HEAD, HitType.SNARE_XSTICK], [EffectTargetType.SNARE], colors['tronBlueMain'], colors['tronBlueTrail'])
    createDrumHitEffect(effects, [HitType.TOM1], [EffectTargetType.TOM1], colors['drumHit1a'], colors['drumHit1b'])
    createDrumHitEffect(effects, [HitType.TOM2], [EffectTargetType.TOM2], colors['drumHit3a'], colors['drumHit3b'])
    createDrumHitEffect(effects, [HitType.TOM3], [EffectTargetType.TOM3], colors['drumHit2a'], colors['drumHit2b'])

    # TODO Create sparkle function
    sparkleDuration = 1.75
    effects.append(
        EffectConfig([HitType.CRASH2_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM2], 15, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH2_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM1], 5, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH2_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM3], 5, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH2_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.SNARE], 3, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )

    ##################
    effects.append(
        EffectConfig([HitType.CRASH1_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM1], 15, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH1_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM2], 5, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH1_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.TOM3], 5, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )
    effects.append(
        EffectConfig([HitType.CRASH1_EDGE], [
                ConstantAmplitude(1.0),
                LinearColorTransition(colors['sparkle1'], colors['sparkle3'], sparkleDuration),
                Sparkle([EffectTargetType.SNARE], 3, 1, 1, sparkleDuration)
            ],
            EffectPriority.VERY_HIGH,
            isAmbient=False
        )
    )


    return effects
