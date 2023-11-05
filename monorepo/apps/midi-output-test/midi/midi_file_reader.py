from midi.midi_drum_note import MidiDrumNote
from midi.midi_playback import MidiPlayback

class MidiFileReader():
    def read(self, filename):
        f = open(filename, "r")
        lines = f.readlines()
        notes = []
        for line in lines:
            line = line.replace("[", "").replace("]", "")
            line = line.replace("(", "").replace(")", "")
            line = line.replace("\n", "")
            tok = line.split(", ")

            status = int(tok[0])
            note = int(tok[1])
            velocity = int(tok[2])
            dt = float(tok[3])
            note = MidiDrumNote(status, note, velocity, dt)
            notes.append(note)

        MidiPlayback().play(notes)