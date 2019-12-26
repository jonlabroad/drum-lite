import PartialEffectConfig from "./PartialEffectConfig";

export default abstract class BaseEffectConfig {
    name: string = "Untitled";
    effects: PartialEffectConfig[] = [];
}