from midi.midi_mapper import MidiMapper

class MidiDrumNote:
    def __init__(self, midiNote, velocity, dt):
        self.note = MidiMapper().map(midiNote)
        self.velocity = velocity
        self.dt = dt

    def toString(self):
        print([self.note, self.velocity, self.dt])
