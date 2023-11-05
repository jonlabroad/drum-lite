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

    def run(self):
        self.open()

    def noteHandler(self, midiNote, junk):
        t = time.time()
        print(midiNote)
        note = MidiDrumNote.fromRawNote(midiNote, t)
        note = self.filter.filterNote(note)
        if note:
            self.handler(note.note)

    def open(self):
        if not self.isPortOpen():
          self.midi_in = rtmidi.MidiIn()
          ports = self.midi_in.get_ports()
          if ports:
              portNum = 0
              print(ports)
              for port in ports:
                  if "USB MIDI Interface" in port or "TD-17" in port:
                      print("Opening midi port: " + port)
                      self.midi_in.open_port(portNum)
                      self.port = port
                      self.midi_in.set_callback(self.noteHandler)
                  portNum = portNum + 1

    def isPortOpen(self):
      if (self.port is not None):
        isOpen = rtmidi.MidiIn.is_port_open(self.port)
        print(f"isOpen: {isOpen}")
        return isOpen
      print("isOpen: False")
      return False

