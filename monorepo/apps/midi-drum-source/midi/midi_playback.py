import time
from midi.hit_type import HitType

class MidiPlayback:
    def play(self, notes):
        for note in notes:
            if (note.dt > 5):
                continue

            if (note.velocity == 0):
                continue

            if (note.note == HitType.UNKNOWN):
                continue

            time.sleep(note.dt)
            print(note.toString())
