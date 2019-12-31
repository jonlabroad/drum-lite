import EffectActivator from "@jonlabroad/drum-lite/dist/effect/EffectActivator";
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig";

export default class GlobalConfig {
    // These should really go elsewhere, but how can actions interact with them?
    public static effectActivator?: EffectActivator = undefined;
    public static config?: FullEffectConfig = undefined;
}