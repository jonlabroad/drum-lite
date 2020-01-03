import { EffectParameter } from "@jonlabroad/drum-lite/dist/light/effect/PartialEffect";
import RGB from "@jonlabroad/drum-lite/dist/light/RGB";

export default class ParameterHelpers {
    public static setValue(parameter: EffectParameter<any>, val: any) {
        // TODO handle arrays of each type

        switch (parameter.options.type) {
            case "number":
                parameter.val = parseFloat(val);
                return;
            case "boolean":
                parameter.val = val;
                return;
            case "rgb":
                parameter.val = new RGB(val.r, val.b, val.g);
                return;
            case "target":
                parameter.val = val;
                return;
            default:
                parameter.val = val;
        }
    }
}