import EffectConfig from "../../../config/EffectConfig";
import { ModifierEffectType } from "../../../effect/RunnableEffect";
import CommonParams from "../../../config/params/CommonParams";
import LedInstruction from "../../../effect/LedInstruction";
import MidiDrumNote from "../../../midi/MidiDrumNote";
import EffectModifier from "./EffectModifier";
import LEDSelector from "../../../util/LEDSelector";
import Transitions from "../../../config/transitions/Transitions";

export class AmplitudeModifierConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Multiplier"] = CommonParams.number("Multiplier", values);
        this.params["Targets"] = CommonParams.targets(undefined, values);
        this.params["Triggers"] = CommonParams.triggers(undefined, values);
        this.params["Duration"] = CommonParams.number("Duration", values, undefined, 1000);
    }
}

export default class AmplitudeModifierEffect extends EffectModifier {
    public type: ModifierEffectType = "amplitude";

    constructor(config: AmplitudeModifierConfig, note?: MidiDrumNote) {
        super(config, note);
    }

    public modInstructions(instructions: LedInstruction[], t: number): LedInstruction[] {
        const startTime = this.config.params.StartTime.val;
        const transition = Transitions.get(this.config.params.Transition.val ?? "linear");
        const tNorm = transition.getTNorm(t, startTime, this.config.params.Duration.val);
        const scaledMultiplier = (1 - tNorm) * this.config.params.Multiplier.val ?? 0;

        const ledsToModify = new Set<number>([...(new LEDSelector()).getAllTargetPositionsArray(this.config.params.Targets.val ?? [])]);
        let modify = false;
        for (let instr of instructions) {
            if (instr.ledPositions?.find(p1 => ledsToModify.has(p1))) {
                modify = true;
                break;
            }
        }

        if (modify) {
            instructions = instructions.map(instr => {
                instr.amplitude = (instr.amplitude ?? 0) * (1 + (scaledMultiplier ?? 1.0));
                return instr;
            })
        }

        return instructions;
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const duration = this.config.params.Duration.val;
        const dt = t - startTime;
        return dt > duration;
    }
}