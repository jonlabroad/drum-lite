import EffectConfig from "./EffectConfig";

export default abstract class FullEffectConfig {
    name: string = "Untitled";
    effects: EffectConfig<any>[] = [];
}