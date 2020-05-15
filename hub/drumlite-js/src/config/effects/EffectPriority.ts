export enum EffectPriority {
    LOWEST = 0,
    LOW = 15,
    MEDIUM_LOW = 30,
    MEDIUM = 45,
    MEDIUM_HIGH = 60,
    HIGH = 70,
    VERY_HIGH = 85,
    HIGHEST = 100,
    ANY = 1000
};

export const EffectPriorityString: {[key: number]: string} = {
    [EffectPriority.LOWEST]: "Lowest",
    [EffectPriority.LOW]: "Low",
    [EffectPriority.MEDIUM_LOW]: "Medium Low",
    [EffectPriority.MEDIUM]: "Medium",
    [EffectPriority.MEDIUM_HIGH]: "Medium High",
    [EffectPriority.HIGH]: "High",
    [EffectPriority.VERY_HIGH]: "Very High",
    [EffectPriority.HIGHEST]: "Highest",
    [EffectPriority.ANY]: "Any"
}