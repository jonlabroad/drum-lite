from midi.midi_mapper import MidiMapper

class MidiDrumNote:
    def __init__(self, midiNote, velocity, dt):
        self.note = MidiMapper().map(midiNote)
        self.velocity = velocity
        self.dt = dt

    @staticmethod
    def fromRawNote(rawNote):
        print(rawNote)
        val = rawNote[0]
        static = val[0]
        midiNoteNum = val[1]
        velocity = val[2]
        note = MidiDrumNote(midiNoteNum, velocity, 0)
        return note

    def toString(self):
        print([self.note, self.velocity, self.dt])
