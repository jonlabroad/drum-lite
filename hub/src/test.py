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

from data.testconfig.test import basicConfig

class MidiTest:
    def open(self, callback):
        self.midi_in = rtmidi.MidiIn()
        ports = self.midi_in.get_ports()
        if ports:
            self.midi_in.open_port(0)

        self.midi_in.set_callback(callback)

    def recordToFile(self):
        self.outfile = open("recording.txt", "w")
        self.open(self.recordCallback)

    def recordCallback(self, msg, data):
        print(msg)
        self.outfile.write(str(msg))
        self.outfile.write("\n")

    def readTest(self):
        MidiFileReader().read("test1.txt")

#MidiTest().recordToFile()
#MidiFileReader().readTest()

config = basicConfig()
compiled = EffectCompiler(config).compile()

eventActivator = EffectActivator(compiled)
eventActivator.handleNote(HitType.SNARE_HEAD)
#eventActivator.handleNote(HitType.KICK)
#eventActivator.handleNote(HitType.KICK)
#eventActivator.handleNote(HitType.KICK)

runner = EffectRunner(eventActivator)
runner.run()


