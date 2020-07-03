import EffectConfig from "../config/EffectConfig";
import RunnableEffect from "../effect/RunnableEffect";
import CommonParams from "../config/params/CommonParams";
import LedInstruction from "../effect/LedInstruction";
import AmplitudeElementEffect, { AmplitudeElementConfig } from "./elements/rudiments/AmplitudeElement";
import PositionElementEffect from "./elements/rudiments/PositionElement";
import ColorElementEffect from "./elements/rudiments/ColorElement";
import MidiDrumNote from "../midi/MidiDrumNote";

export class ConstantAmplitudeConfig extends EffectConfig {
    constructor() {
        super();
        this.params["Color"] = CommonParams.color();
        this.params["Amplitude"] = CommonParams.amplitude();
        this.params["Targets"] = CommonParams.targets();
    }
}

export default class ConstantAmplitudeEffect extends RunnableEffect {
    constructor(config: ConstantAmplitudeConfig) {
        super(config);
    }

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        return [
            new AmplitudeElementEffect(this.config).getInstructions(t),
            new PositionElementEffect(this.config).getInstructions(t),
            new ColorElementEffect(this.config).getInstructions(t)
        ]
    }

    public isComplete(t: number) {
        return false;
    }
}