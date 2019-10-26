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

def basicConfig():
    effects = []

    effects.append(
        EffectConfig([], [
            ConstantAmplitude(0.02),
            SingleColorEffect(RGBW(128, 5, 0)),
            #CubicSingleSpiral(allTargets, 2.0, 6),
            ConstantSpin(allTargets, 4.0, 1.0, 4, 0, 1.0),
            #ConstantTargetsEffect(allTargets)
        ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    effects.append(
        EffectConfig([], [
            ConstantAmplitude(0.05),
            SingleColorEffect(RGBW(255, 20, 0)),
            #CubicSingleSpiral(allTargets, 2.0, 6),
            ConstantSpin(allTargets, 4.0, 1.0, 4, 1, 0.8),
            #ConstantTargetsEffect(allTargets)
        ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    effects.append(
        EffectConfig([], [
            ConstantAmplitude(0.08),
            SingleColorEffect(RGBW(255, 51, 0)),
            #CubicSingleSpiral(allTargets, 2.0, 6),
            ConstantSpin(allTargets, 4.0, 1.0, 4, 2, 0.8),
            #ConstantTargetsEffect(allTargets)
        ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    effects.append(
        EffectConfig([], [
            ConstantAmplitude(0.1),
            SingleColorEffect(RGBW(230, 115, 0)),
            #CubicSingleSpiral(allTargets, 2.0, 6),
            ConstantSpin(allTargets, 4.0, 1.0, 4, 3, 0.8),
            #ConstantTargetsEffect(allTargets)
        ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    effects.append(
        EffectConfig([], [
            ConstantAmplitude(0.15),
            SingleColorEffect(RGBW(255, 204, 0)),
            #CubicSingleSpiral(allTargets, 2.0, 6),
            ConstantSpin(allTargets, 4.0, 1.0, 4, 4, 0.8),
            #ConstantTargetsEffect(allTargets)
        ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    effects.append(
        EffectConfig([HitType.SNARE_HEAD], [
            CubicFadeOutEffect(2.0),
            #LinearColorTransition(RGBW(255, 255, 0, 0), RGBW(200, 0, 0, 0), 1.0),
            #TripleLinearColorTransition(RGBW(255, 255, 255, 0), RGBW(255, 255, 0, 0), RGBW(255, 0, 0, 0), 1.0),
            TripleCubicColorTransition(RGBW(255, 255, 120, 0), RGBW(255, 200, 0, 0), RGBW(255, 80, 0, 0), 2.0),
            CubicSingleSpiral([
                EffectTargetType.SNARE
            ], 2.0, 6),
            #ConstantTargetsEffect([EffectTargetType.SNARE])
        ], EffectPriority.HIGH)
    )

    effects.append(
        EffectConfig([HitType.TOM1], [
            CubicFadeOutEffect(2.0),
            #LinearColorTransition(RGBW(255, 255, 0, 0), RGBW(200, 0, 0, 0), 1.0),
            #TripleLinearColorTransition(RGBW(255, 255, 255, 0), RGBW(255, 255, 0, 0), RGBW(255, 0, 0, 0), 1.0),
            TripleCubicColorTransition(RGBW(255, 255, 120, 0), RGBW(255, 200, 0, 0), RGBW(255, 80, 0, 0), 2.0),
            CubicSingleSpiral([
                EffectTargetType.TOM1
            ], 2.0, 6),
            #ConstantTargetsEffect([EffectTargetType.SNARE])
        ], EffectPriority.HIGH)
    )

    effects.append(
        EffectConfig([HitType.TOM2], [
            CubicFadeOutEffect(2.0),
            #LinearColorTransition(RGBW(255, 255, 0, 0), RGBW(200, 0, 0, 0), 1.0),
            #TripleLinearColorTransition(RGBW(255, 255, 255, 0), RGBW(255, 255, 0, 0), RGBW(255, 0, 0, 0), 1.0),
            TripleCubicColorTransition(RGBW(255, 255, 120, 0), RGBW(255, 200, 0, 0), RGBW(255, 80, 0, 0), 2.0),
            CubicSingleSpiral([
                EffectTargetType.TOM2
            ], 2.0, 6),
            #ConstantTargetsEffect([EffectTargetType.SNARE])
        ], EffectPriority.HIGH)
    )

    effects.append(
        EffectConfig([HitType.TOM3], [
            CubicFadeOutEffect(2.0),
            #LinearColorTransition(RGBW(255, 255, 0, 0), RGBW(200, 0, 0, 0), 1.0),
            #TripleLinearColorTransition(RGBW(255, 255, 255, 0), RGBW(255, 255, 0, 0), RGBW(255, 0, 0, 0), 1.0),
            TripleCubicColorTransition(RGBW(255, 255, 120, 0), RGBW(255, 200, 0, 0), RGBW(255, 80, 0, 0), 2.0),
            CubicSingleSpiral([
                EffectTargetType.TOM3
            ], 2.0, 6),
            #ConstantTargetsEffect([EffectTargetType.SNARE])
        ], EffectPriority.HIGH)
    )

#    effects.append(
#        EffectConfig([HitType.KICK], [
#            LinearFadeOutEffect(0.3),
#            SingleColorEffect(RGBW(0, 0, 100, 30)),
#            ConstantTargetsEffect(allTargets)
#        ], EffectPriority.LOW
#        )
#    )

    return effects
