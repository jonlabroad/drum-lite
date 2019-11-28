import ResolvedEffect from "../../effect/ResolvedEffect";
import JsonEffectConfig from "./JsonEffectConfig";
import RGB from "../RGB";

export interface Parameters {
    startTime: number
    isModifier: boolean
    typeName: string
    className: string
    [key: string]: string | number | boolean | RGB | undefined | null | string[] | number[] | boolean[] | RGB[]
}

export default class PartialEffect {
    protected params: Parameters = {
        startTime: 0,
        isModifier: false,
        typeName: "",
        className: ""
    };

    constructor(type: string, className: string, startTime: number = 0) {
        this.params.typeName = type;
        this.params.className = className;
        this.params.startTime = startTime
        this.params.isModifier = false
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