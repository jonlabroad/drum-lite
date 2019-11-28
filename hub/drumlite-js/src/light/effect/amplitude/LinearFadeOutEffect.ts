import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class LinearFadeOutEffect extends PartialEffect {
    constructor(fadeOutDuration?: number, startAmplitude?: number, dt=0) {
        super("Linear Fade Out", "Amplitude", dt);
        this.params.fadeOutDuration = fadeOutDuration;
        this.params.startAmplitude = startAmplitude;
    }

    public getEffect(t: number) {
        const dt = t - this.params.startTime;
        const startAmp = this.params.amplitude as number;
        const fadeOutDuration = this.params.fadeOutDuration as number;
        const scale = startAmp - dt / fadeOutDuration * startAmp;
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number) {
        const startTime = this.params.startTime as number;
        const fadeOutDuration = this.params.fadeOutDuration as number;
        return t - startTime >= fadeOutDuration;
    }
}