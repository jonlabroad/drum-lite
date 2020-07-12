import { EffectParameter, EffectParameterOptions, defaultAmplitudeRange, defaultMillisecondRange, defaultLedRange } from "../effects/EffectParameter";
import { EffectPriority } from "../effects/EffectPriority";

export default class CommonParams {
    public static amplitude(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Amplitude", this.findValue("amplitude", 1, values), {
            ...options,
            type: "number"
        });
    }

    public static color(name: string, values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter(name, this.findValue(name, [255, 255, 255], values), {
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
        return new EffectParameter("Start Time", this.findValue("starttime", 0, values), {
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
        return (values && values[key.toLowerCase()]) ? values[key.toLowerCase()] : defaultVal;
    }

    public static period(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter("Period", this.findValue("period", 1000, values), {
            ...options,
            type: "number",
            range: defaultMillisecondRange
        });
    }

    public static speed(values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return this.number("Speed", values, options, 1);
    }

    public static number(name: string, values: {[key: string]: any} = {}, options?: EffectParameterOptions, defaultVal?: number) {
        return new EffectParameter(name, this.findValue(name, defaultVal ?? 0, values), {
            ...options,
            type: "number",
            range: defaultLedRange
        });
    }

    public static transition(name: string, values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter(name, this.findValue(name, "linear", values), {
            ...options,
            type: "transition"
        });
    }

    public static triggers(name?: string, values: {[key: string]: any} = {}, options?: EffectParameterOptions) {
        return new EffectParameter(name ?? "triggers", this.findValue(name ?? "triggers", [], values), {
            ...options,
            isArray: true,
            type: "hittype"
        });
    }
}