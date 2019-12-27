import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";

export default class ParameterHelpers {
    public static setValue(parameter: EffectParameter<any>, val: string) {
        // TODO handle arrays of each type

        switch (parameter.type) {
            case "number":
                parameter.val = parseFloat(val);
                console.log(parameter);
                return;
            case "boolean":
                parameter.val = val.toUpperCase() === "TRUE";
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