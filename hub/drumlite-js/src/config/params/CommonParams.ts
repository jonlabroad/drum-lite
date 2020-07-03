import { EffectParameter, EffectParameterOptions } from "../effects/EffectParameter";
import { EffectPriority } from "../effects/EffectPriority";

export default class CommonParams {
    public static amplitude(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Amplitude", this.findValue("amplitude", 1, values), {
            ...options,
            type: "number"
        });
    }

    public static color(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Color", this.findValue("color", [255, 255, 255], values), {
            ...options,
            type: "rgb"
        });
    }

    public static positions(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Positions", this.findValue("positions", [], values), {
            ...options,
            type: "number",
            isArray: true
        });
    }

    public static targets(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Targets", this.findValue("targets", [], values), {
            ...options,
            type: "target",
            isArray: true
        });
    }

    public static startTime(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Start Time", this.findValue("starttime", [], values), {
            ...options,
            type: "number",
            isArray: false
        });
    }

    public static priority(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Priority", this.findValue("priority", EffectPriority.LOWEST, values), {
            ...options,
            type: "priority",
            isArray: false
        });
    }

    private static findValue(key: string, defaultVal: any, values?: {[key: string]: any}) {
        return values ? values[key.toLowerCase()]: defaultVal;
    }
}