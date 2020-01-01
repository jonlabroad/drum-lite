import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";

export default class ParameterHelpers {
    public static setValue(parameter: EffectParameter<any>, val: string) {
        // TODO handle arrays of each type

        switch (parameter.options.type) {
            case "number":
                parameter.val = parseFloat(val);
                return;
            case "boolean":
                parameter.val = val;
                return;
            case "rgb":
                // TODO
                return;
            case "target":
                parameter.val = val;
            default:
                parameter.val = val;
        }
    }
}