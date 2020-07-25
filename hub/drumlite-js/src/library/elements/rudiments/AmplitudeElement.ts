import EffectConfig from "../../../config/EffectConfig";
import RunnableEffect, { PartialRunnableEffect } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";

export class AmplitudeElementConfig extends EffectConfig {
    constructor() {
        super();
        this.params["Amplitude"] = CommonParams.amplitude();
    }
}

export default class AmplitudeElementEffect extends PartialRunnableEffect {
    constructor(config: EffectConfig) {
        super(config);
    }

    getInstructions(t: number): LedInstruction {
        return new LedInstruction(undefined, this.config.params.Amplitude.val, undefined, this.config.params.Priority?.val);
    }
}