import { EffectParameter, EffectParameterOptions } from "../effects/EffectParameter";

export default class CommonParams {
    public static amplitude(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Amplitude", this.findValue("Amplitude", 0, values), {
            ...options,
            type: "number"
        });
    }

    public static color(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Color", this.findValue("Color", [255, 255, 255], values), {
            ...options,
            type: "rgb"
        });
    }

    public static positions(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Positions", this.findValue("Positions", [], values), {
            ...options,
            type: "number",
            isArray: true
        });
    }

    public static targets(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Targets", this.findValue("Targets", [], values), {
            ...options,
            type: "target",
            isArray: true
        });
    }

    public static startTime(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Start Time", this.findValue("Start Time", [], values), {
            ...options,
            type: "number",
            isArray: false
        });
    }

    private static findValue(key: string, defaultVal: any, values?: {[key: string]: any}) {
        return values ? values[key]: defaultVal;
    }
}