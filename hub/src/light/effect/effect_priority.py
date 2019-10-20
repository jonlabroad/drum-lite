from enum import IntEnum

class EffectPriority(IntEnum):
    LOWEST = 0,
    LOW = 15,
    MEDIUM_LOW = 30,
    MEDIUM = 45,
    MEDIUM_HIGH = 60,
    HIGH = 70,
    VERY_HIGH = 85,
    HIGHEST = 100,
    ANY = 1000