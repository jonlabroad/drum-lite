import EffectActivator from "@jonlabroad/drum-lite/dist/effect/EffectActivator";
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig";

export default class GlobalConfig {
    // These should really go elsewhere, but how can actions interact with them?
    public static effectActivator?: EffectActivator = undefined;
    public static config?: FullEffectConfig = undefined;

    public static ledMessageHost = "ws://10.0.0.27:3000";
    public static commandMessageHost = "ws://10.0.0.27:3003";
    //public static commandMessageHost = "ws://localhost:3003";
}