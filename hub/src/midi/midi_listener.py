import rtmidi
import time

from midi.midi_drum_note import MidiDrumNote
from midi.midi_filter import MidiFilter

class MidiListener:
    def __init__(self, activator):
        self.effectActivator = activator
        self.filter = MidiFilter()

    def run(self):
        self.open()

    def noteHandler(self, midiNote, junk):
        t = time.time()
        note = MidiDrumNote.fromRawNote(midiNote, t)
        note = self.filter.filterNote(note)
        if note:
            self.effectActivator.handleNote(note.note)
        else:
            print("*** Filtered ***")

    def open(self):
        self.midi_in = rtmidi.MidiIn()
        ports = self.midi_in.get_ports()
        print(ports)
        if ports:
            portNum = 0
            for port in ports:
                if "USB MIDI Interface" in port:
                    print("Opening midi port: " + port)
                    self.midi_in.open_port(portNum)
                    self.midi_in.set_callback(self.noteHandler)
                portNum = portNum + 1
