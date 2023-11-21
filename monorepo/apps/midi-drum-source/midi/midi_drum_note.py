from midi.midi_mapper import MidiMapper

class MidiDrumNote:
    def __init__(self, status, midiNote, velocity, dt, rawNote, time=0):
        self.status = status
        self.noteType = MidiMapper().map(midiNote)
        self.note = midiNote
        self.velocity = velocity
        self.dt = dt
        self.time = time
        self.rawNote = rawNote

    @staticmethod
    def fromRawNote(rawNote, time):
        val = rawNote[0]
        status = val[0]
        midiNoteNum = val[1]
        velocity = val[2]
        note = MidiDrumNote(status, midiNoteNum, velocity, 0, rawNote, time)
        return note

    def isNoteOn(self):
        return self.status & 16 != 0

    def toString(self):
        print([self.note, self.velocity, self.dt])

    def to_dict(self):
        return {
            "status": self.status,
            "note": self.note,
            "noteType": str(self.noteType),
            "velocity": self.velocity,
            "dt": self.dt,
            "time": self.time,
            "rawNote": self.rawNote
        }
