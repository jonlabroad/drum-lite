import EffectActivator from "@jonlabroad/drum-lite/dist/effect/EffectActivator";
import BaseEffectConfig from "@jonlabroad/drum-lite/dist/effects/BaseEffectConfig";

export default class GlobalConfig {
    // These should really go elsewhere, but how can actions interact with them?
    public static effectActivator?: EffectActivator = undefined;
    public static config?: BaseEffectConfig = undefined;
}