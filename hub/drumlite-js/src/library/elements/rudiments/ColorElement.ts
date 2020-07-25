import EffectConfig from "../../../config/EffectConfig";
import RunnableEffect, { PartialRunnableEffect } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";

export class ColorElementConfig extends EffectConfig {
    constructor() {
        super();
        this.params["Color"] = CommonParams.color("Color");
    }
}

export default class ColorElementEffect extends PartialRunnableEffect {
    constructor(config: EffectConfig) {
        super(config);
    }

    getInstructions(t: number): LedInstruction {
        return new LedInstruction(this.config.params.Color.val, undefined, undefined, this.config.params.Priority?.val);
    }
}