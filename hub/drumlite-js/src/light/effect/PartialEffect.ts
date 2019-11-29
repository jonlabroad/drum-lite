import ResolvedEffect from "../../effect/ResolvedEffect";
import JsonEffectConfig from "./JsonEffectConfig";

export type ParameterType = "number" | "boolean" | "string" | "rgb" | "target";

export class EffectParameter<T> {
    paramName: string
    val: T
    type: ParameterType
    isArray: boolean

    constructor(paramName: string, val: T, type: ParameterType = "number", isArray: boolean = false) {
        this.paramName = paramName;
        this.val = val;
        this.type = type;
        this.isArray = isArray;
    }
}

export class EffectParameters {
    public startTime: EffectParameter<number>

    constructor(startTime: number = 0) {
        this.startTime = new EffectParameter<number>("Start Time", 0);
    }
}

export default class PartialEffect<T extends EffectParameters> {
    isModifier = false
    typeName: string = "unknown"
    className: string = "PartialEffect"

    public params: T;

    constructor(typeName: string, className: string, params: T, startTime: number, isModifier = false) {
        this.typeName = typeName;
        this.className = className;
        this.isModifier = isModifier;
        this.params = params;
        this.params.startTime.val = startTime;
    }

    public getEffect(t: number): ResolvedEffect {
        return new ResolvedEffect(undefined, undefined, undefined)
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