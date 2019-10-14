import time
import rtmidi
import json

from midi_file_reader import MidiFileReader
from light.effect.amplitude_effects.linear_fade_out_effect import LinearFadeOutEffect

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

effect = LinearFadeOutEffect(time.time(), 1)
while not effect.isComplete(time.time()):
    print(effect.getEffect(time.time()))
    time.sleep(0.01)




#while True:
#    time.sleep(1)

