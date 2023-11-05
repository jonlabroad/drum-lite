from midi.midi_mapper import MidiMapper

class MidiDrumNote:
    def __init__(self, status, midiNote, velocity, dt, time=0):
        self.status = status
        self.note = MidiMapper().map(midiNote)
        self.velocity = velocity
        self.dt = dt
        self.time = time

    @staticmethod
    def fromRawNote(rawNote, time):
        val = rawNote[0]
        status = val[0]
        midiNoteNum = val[1]
        velocity = val[2]
        note = MidiDrumNote(status, midiNoteNum, velocity, 0, time)
        return note

    def isNoteOn(self):
        return self.status & 16 != 0

    def toString(self):
        print([self.note, self.velocity, self.dt])

    def to_dict(self):
        return {
            "status": self.status,
            "note": str(self.note),
            "velocity": self.velocity,
            "dt": self.dt,
            "time": self.time
        }
