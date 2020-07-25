import EffectConfig from "../../../config/EffectConfig";
import RunnableEffect, { PartialRunnableEffect } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";

export class PositionElementConfig extends EffectConfig {
    constructor() {
        super();
        this.params["Positions"] = CommonParams.positions();
    }
}

export default class PositionElementEffect extends PartialRunnableEffect {
    constructor(config: EffectConfig) {
        super(config);
    }

    getInstructions(t: number): LedInstruction {
        return new LedInstruction(undefined, undefined, this.config.params.Positions.val, this.config.params.Priority?.val);
    }
}