import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class LinearFadeOutEffect extends PartialEffect {
    fadeOutDuration: number;
    startAmplitude: number;

    constructor(fadeOutDuration: number, startAmplitude: number, dt=0) {
        super(dt);
        this.fadeOutDuration = fadeOutDuration;
        this.startAmplitude = startAmplitude;
    }

    public getEffect(t: number) {
        const dt = t - this.startTime;
        const scale = this.startAmplitude - dt / this.fadeOutDuration * this.startAmplitude;
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        return t - this.startTime >= this.fadeOutDuration;
    }
}