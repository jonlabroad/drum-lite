import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class CubicFadeOut extends PartialEffect {
    fadeOutDuration: number;

    constructor(fadeOutDuration: number, dt = 0) {
        super(dt);
        this.fadeOutDuration = fadeOutDuration;
    }

    public getEffect(t: number) {
        const dt = t - this.startTime;
        const tNorm = dt / this.fadeOutDuration - 1;
        const scale = 1 - (tNorm * tNorm * tNorm + 1);
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal(): boolean {
        return true;
    }

    public isComplete(t: number) {
        return t - this.startTime >= this.fadeOutDuration;
    }

}
