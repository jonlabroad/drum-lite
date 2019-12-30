import ResolvedEffect from "../../effect/ResolvedEffect";
import JsonEffectConfig from "./JsonEffectConfig";

export type ParameterType = "number" | "boolean" | "string" | "rgb" | "target";

export class EffectParameterOptions {
    type?: ParameterType = "number";
    isArray?: boolean = false;
    isHidden?: boolean = false;
    range?: EffectParameterRange = defaultAmplitudeRange
}

export interface EffectParameterRange {
    min: number
    max: number
    inc: number
}

export const defaultAmplitudeRange = {
    min: 0,
    max: 10,
    inc: 0.1
}

export const defaultMillisecondRange = {
    min: 0,
    max: 10000,
    inc: 50
}

const defaultOptions = new EffectParameterOptions();

export class EffectParameter<T> {
    paramName: string
    val: T
    options: EffectParameterOptions

    constructor(paramName: string, val: T, options?: EffectParameterOptions) {
        this.paramName = paramName;
        this.val = val;
        const inOptions = options || new EffectParameterOptions();
        this.options = {...defaultOptions, ...inOptions};
    }
}

export class EffectParameters {
    public effectName: string = "Unknown"
    public typeName: string = "Unknown"
    public params: {[key: string]: EffectParameter<any>} = {}

    constructor(startTime: number = 0) {
        this.params.startTime = new EffectParameter<number>("Start Time", 0, {type: "number", isHidden: true});
    }
}

export default class PartialEffect<T extends EffectParameters> {
    isModifier = false
    public params: T;

    constructor(params: T, startTime: number, isModifier = false) {
        this.isModifier = isModifier;
        this.params = params;
        this.params.params.startTime.val = startTime;
    }

    public getEffect(t: number): ResolvedEffect[][] {
        return [];
    }

    public isTemporal(): boolean {
        return false;
    }

    public isComplete(t: number) {
        return false;
    }

    public getAmbientDuration(): number {
        return 0;
    }

    public fromJson(json: string) {
        const config = JSON.parse(json) as JsonEffectConfig;
        this.params = {...this.params, ...config.parameters};
    }
}