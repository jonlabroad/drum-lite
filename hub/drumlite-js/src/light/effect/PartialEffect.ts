import ResolvedEffect from "../../effect/ResolvedEffect";

export default class PartialEffect {
    public startTime: number = 0;
    public isModifier: boolean = false;

    constructor(startTime: number = 0) {
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