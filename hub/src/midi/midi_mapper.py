from midi.hit_type import HitType

class MidiMapper:
    def map(self, note):
        try:
            hit = HitType(note)
            return hit
        except:
            return HitType.UNKNOWN