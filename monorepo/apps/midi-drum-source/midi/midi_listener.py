import rtmidi
import time

from midi.midi_drum_note import MidiDrumNote
from midi.midi_filter import MidiFilter

class MidiListener:
    def __init__(self, handler):
        self.handler = handler
        self.filter = MidiFilter()
        self.connected = False
        self.port = None
        self.portNum = None
        self.midi_in = rtmidi.MidiIn()

    def run(self):
        self.open()

    def noteHandler(self, midiNote, junk):
        t = time.time()
        print(midiNote)
        note = MidiDrumNote.fromRawNote(midiNote, t)
        note = self.filter.filterNote(note)
        if note:
            self.handler(note)

    def open(self):
        if not self.isPortOpen():
            portInfo = self.findPortToOpen()
            if portInfo is not None:
                self.midi_in.open_port(portInfo["portNum"])
                self.port = portInfo["port"]
                self.portNum = portInfo["portNum"]
                self.midi_in.set_callback(self.noteHandler)

    def isPortOpen(self):
        portInfo = self.findPortToOpen()
        if portInfo is None:
            self.midi_in.close_port()
            self.port = None
            self.portNum = None
            return False

        if (self.port is not None):
            isOpen = rtmidi.MidiIn.is_port_open(self.port)
            print(f"isOpen: {isOpen}")
            return isOpen
        print("isOpen: False")
        return False

    def findPortToOpen(self):
        ports = self.midi_in.get_ports()
        if ports:
            portNum = 0
            print(ports)
            for port in ports:
                if "USB MIDI Interface" in port:
                    return { "portNum": portNum, "port": port }
                portNum = portNum + 1
