import EffectActivator from "@jonlabroad/drum-lite/dist/effect/EffectActivator";
import FullEffectConfig from "@jonlabroad/drum-lite/dist/effects/FullEffectConfig";

export default class GlobalConfig {
    // These should really go elsewhere, but how can actions interact with them?
    public static effectActivator?: EffectActivator = undefined;
    public static config?: FullEffectConfig = undefined;

    public static ledMessageHost = "ws://drumlite-hub.jdl.local:3000";
    public static commandMessageHost = "ws://drumlite-hub.jdl.local:3003";
    //public static commandMessageHost = "ws://localhost:3003";
}