import EffectConfig from "../../../config/EffectConfig";
import RunnableEffect, { RunnableEffectType } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";
import AmplitudeElementEffect from "../rudiments/AmplitudeElement";
import PositionElementEffect from "../rudiments/PositionElement";
import ColorElementEffect from "../rudiments/ColorElement";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class ConstantAmplitudeConfig extends EffectConfig {
    constructor(values: {[key: string]: string}) {
        super(values);
        this.params["Color"] = CommonParams.color("Color");
        this.params["Amplitude"] = CommonParams.amplitude();
        this.params["Targets"] = CommonParams.targets();
    }
}

export default class ConstantAmplitudeEffect extends RunnableEffect {
    public type: RunnableEffectType = "constantamplitude";

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