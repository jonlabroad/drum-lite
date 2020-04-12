import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import MidiDrumNote from "../../../midi/MidiDrumNote";
import ScaleFunctions from "../../../util/ScaleFunctions";

export class LinearFadeOutEffectParams extends EffectParameters {
    effectName = "Linear Fade Out";
    typeName = "Amplitude";

    constructor(amplitude: number = 1, fadeOutDuration: number = 1, triggerVel: number = 0) {
        super();
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);
        this.params.fadeOutDuration = new EffectParameter<number>("Fade Out Duration", fadeOutDuration, {range: defaultMillisecondRange});
        this.params.minTriggerVelocity = new EffectParameter<number>("Trigger Velocity", triggerVel, {isHidden: false, type: "number", isArray: false});
    }
}

export default class LinearFadeOutEffect extends PartialEffect<LinearFadeOutEffectParams> {
    constructor(params: LinearFadeOutEffectParams, dt=0) {
        super(params, dt);
    }

    public getEffect(t: number, note?: MidiDrumNote) {
        const ampModifierFloor = 0.2;
        let startAmp = this.params.params.amplitude.val;
        if (note) {
            const modifier = Math.max(ScaleFunctions.cubicEaseInOut(note.velocity, 0, 100), ampModifierFloor);
            startAmp *= modifier;
        }

        const startTime = note ? note.time.getTime() : this.params.params.startTime.val;
        const dt = t - startTime;
        const fadeOutDuration = this.params.params.fadeOutDuration.val as number;
        const scale = startAmp - dt / fadeOutDuration * startAmp;
        return [[ResolvedEffect.createAmplitude(scale)]];
    }

    public isTemporal() {
        return true;
    }

    public isComplete(t: number, note?: MidiDrumNote) {
        if (note && note.velocity < this.params.params.minTriggerVelocity.val) {
            return true;
        }

        const startTime = note ? note.time.getTime() : this.params.params.startTime.val;
        const fadeOutDuration = this.params.params.fadeOutDuration.val;
        return t - startTime >= fadeOutDuration;
    }
}