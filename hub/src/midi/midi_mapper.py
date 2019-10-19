from midi.hit_type import HitType

class MidiMapper:
    @staticmethod
    def map(note):
        try:
            hit = HitType(note)
            return hit
        except:
            return HitType.UNKNOWN