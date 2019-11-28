import PartialEffect from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class CubicFadeOut extends PartialEffect {
    constructor(fadeOutDuration?: number, dt = 0) {
        super("Cubic Fade Out", "Amplitude", dt);
        this.params.fadeOutDuration = fadeOutDuration;
    }

    public getEffect(t: number) {
        const dt = t - this.params.startTime;
        const tNorm = dt / (this.params.fadeOutDuration as number) - 1;
        const scale = 1 - (tNorm * tNorm * tNorm + 1);
        return ResolvedEffect.createAmplitude(scale);
    }

    public isTemporal(): boolean {
        return true;
    }

    public isComplete(t: number) {
        return t - this.params.startTime >= (this.params.fadeOutDuration as number);
    }
}
