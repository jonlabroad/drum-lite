import EffectConfig from "./EffectConfig";

export default abstract class FullEffectConfig {
    name: string = "Untitled";
    effects: EffectConfig<any>[] = [];

    public init() {
        this.effects.forEach(e => e.init());
    }
}