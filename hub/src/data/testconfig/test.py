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
        EffectConfig([HitType.SNARE_HEAD], [
            CubicFadeOutEffect(4.0),
            #LinearColorTransition(RGBW(255, 255, 0, 0), RGBW(200, 0, 0, 0), 1.0),
            #TripleLinearColorTransition(RGBW(255, 255, 255, 0), RGBW(255, 255, 0, 0), RGBW(255, 0, 0, 0), 1.0),
            TripleCubicColorTransition(RGBW(255, 255, 120, 0), RGBW(255, 200, 0, 0), RGBW(255, 80, 0, 0), 4.0),
            CubicSingleSpiral([
                EffectTargetType.TOM3
            ], 4.0, 2),
            #ConstantTargetsEffect([EffectTargetType.SNARE])
        ], EffectPriority.HIGH)
    )

    color = RGBW(128, 60, 60)
    effects.append(
        EffectConfig([HitType.TOM2], [
                ConstantAmplitude(1.0),
                SingleColorEffect(color),
                #CubicSingleSpiral(allTargets, 2.0, 6),
                ConstantSpin([EffectTargetType.TOM2], 4.0, 1.0, 1, 0, 1.0),
            ], EffectPriority.LOWEST, isAmbient=False
        )
    )

    color = RGBW(128, 128, 128)
    effects.append(
        EffectConfig([], [
                ConstantAmplitude(1.0),
                SingleColorEffect(color),
                #CubicSingleSpiral(allTargets, 2.0, 6),
                ConstantSpin([EffectTargetType.TOM2], 4.0, 1.0, 1, 0, 1.0),
            ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    color = RGBW(128, 128, 128)
    effects.append(
        EffectConfig([], [
                ConstantAmplitude(1.0),
                SingleColorEffect(color),
                #CubicSingleSpiral(allTargets, 2.0, 6),
                ConstantSpin([EffectTargetType.TOM3]   , 4.0, 1.0, 1, 0, 1.0),
            ], EffectPriority.LOWEST, isAmbient=True
        )
    )

    return effects
