import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class CubicFadeOutParameters extends EffectParameters {
    effectName = "Cubic Fade Out";
    typeName = "Amplitude";

    constructor(fadeOutDuration: number = 0) {
        super();
        this.params.fadeOutDuration = new EffectParameter<number>("Fade Out Duration", fadeOutDuration, {range: defaultMillisecondRange});
    }
}

export default class CubicFadeOut extends PartialEffect<CubicFadeOutParameters> {
    constructor(params: CubicFadeOutParameters, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const dt = t - this.params.params.startTime.val;
        const tNorm = dt / (this.params.params.fadeOutDuration.val) - 1;
        const scale = 1 - (tNorm * tNorm * tNorm + 1);
        return [[ResolvedEffect.createAmplitude(scale)]];
    }

    public isTemporal(): boolean {
        return true;
    }

    public isComplete(t: number, note?: MidiDrumNote) {
        if (note && note.velocity < this.params.params.minTriggerVelocity.val) {
            return true;
        }

        return t - this.params.params.startTime.val >= (this.params.params.fadeOutDuration.val);
    }
}
