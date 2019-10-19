from light.effect_config import EffectConfig
from midi.hit_type import HitType
from light.rgbw import RGBW
from light.effect.amplitude_effects.linear_fade_out_effect import LinearFadeOutEffect
from light.effect.color_effects.single_color_effect import SingleColorEffect
from light.effect.translation_effects.constant_targets_effect import ConstantTargetsEffect
from light.effect.effect_target_type import EffectTargetType

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
            LinearFadeOutEffect(0.6),
            SingleColorEffect(RGBW(254, 100, 50, 10)),
            ConstantTargetsEffect([
                EffectTargetType.SNARE
            ])
        ])
    )

    effects.append(
        EffectConfig([HitType.KICK], [
            LinearFadeOutEffect(0.3),
            SingleColorEffect(RGBW(0, 0, 100, 30)),
            ConstantTargetsEffect(allTargets)
        ])
    )

    return effects
