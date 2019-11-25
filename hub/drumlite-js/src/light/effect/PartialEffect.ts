import ResolvedEffect from "../../effect/ResolvedEffect";

export default class PartialEffect {
    public startTime: number = 0;
    public isModifier: boolean = false;
    public typeName: string;
    public className: string;

    constructor(type: string, className: string, startTime: number = 0) {
        this.typeName = type;
        this.className = className;
        this.startTime = startTime
        this.isModifier = false
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
}