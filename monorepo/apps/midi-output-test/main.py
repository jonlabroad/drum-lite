import time
from midi.midi_drum_note import MidiDrumNote
from midi.hit_type import HitType
from midi.midi_listener import MidiListener
from rtmidi.midiutil import open_midiinput
from midi.midi_writer import MidiWriter

writer = MidiWriter()

if __name__ == '__main__':
    t = 0
    while True:
        writer.open()
        time.sleep(1)
        writer.write()
        t = t + 1

    sio.disconnect()
