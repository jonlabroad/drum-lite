from enum import Enum

class HitType(Enum):
    KICK = 36
    SNARE_HEAD = 38
    SNARE_RIM = 40
    SNARE_XSTICK = 37
    TOM1 = 48
    TOM1_RIM = 50
    TOM2 = 45
    TOM2_RIM = 47
    TOM3 = 43
    TOM3_RIM = 58
    HH_OPEN_BOW  = 46
    HH_OPEN_EDGE = 26
    HH_CLOSED_BOW = 42
    HH_CLOSED_EDGE = 22
    HH_PEDAL = 44
    CRASH1_BOW = 49
    CRASH1_EDGE = 55
    CRASH2_BOW = 57
    CRASH2_EDGE = 52
    RIDE_BOW = 51
    RIDE_EDGE = 59
    RIDE_BELL = 53
    AUX_HEAD = 27
    AUX_RIM = 28
    UNKNOWN = 0