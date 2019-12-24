import EffectRegistry from "../effects/EffectRegistry";

export default class EffectUtil {
    public static getAllEffectTypes(): string[] {
        console.log(EffectRegistry.effects);
        console.log(new Set<string>(EffectRegistry.effects.map(e => e.typeName)));
        return [...new Set<string>(EffectRegistry.effects.map(e => e.typeName))];
    }

    public static getEffectsOfType(type: string) {
        return EffectRegistry.effects.filter(e => e.typeName === type);
    }
}