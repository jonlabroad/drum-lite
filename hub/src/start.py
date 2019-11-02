import time
import rtmidi
import json

from midi.midi_file_reader import MidiFileReader
from light.effect.amplitude_effects.linear_fade_out_effect import LinearFadeOutEffect
from light.effect.translation_effects.constant_targets_effect import ConstantTargetsEffect
from light.effect.color_effects.single_color_effect import SingleColorEffect
from light.rgbw import RGBW
from light.effect.effect_combiner import EffectCombiner
from light.effect.compiled_effect import CompiledEffect
from light.effect.effect_compiler import EffectCompiler
from execute.effect_activator import EffectActivator
from execute.effect_runner import EffectRunner
from midi.hit_type import HitType
from midi.midi_listener import MidiListener

from data.testconfig.test import basicConfig
from data.testconfig.forge import forgeConfig
from data.testconfig.tron import tronConfig

#config = basicConfig()
config = tronConfig()
#config = forgeConfig()
compiled = EffectCompiler(config).compile()

eventActivator = EffectActivator(compiled)
midiListener = MidiListener(eventActivator)
midiListener.run()

#eventActivator.handleNote(HitType.SNARE_HEAD)
#eventActivator.handleNote(HitType.KICK)
#eventActivator.handleNote(HitType.KICK)
#eventActivator.handleNote(HitType.KICK)

runner = EffectRunner(eventActivator)
runner.run()


