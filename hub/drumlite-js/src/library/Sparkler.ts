import EffectConfig from "../config/EffectConfig";
import LedInstruction from "../effect/LedInstruction";
import RunnableEffect, { RunnableEffectType } from "../effect/RunnableEffect";
import CommonParams from "../config/params/CommonParams";
import MidiDrumNote from "../midi/MidiDrumNote";
import ColorTransitionEffect, { ColorTransitionConfig } from "./elements/behaviors/ColorTransition";
import LEDSelector from "../util/LEDSelector";
import { EffectTarget } from "../config/EffectTarget";
import Transitions from "../config/transitions/Transitions";
import { TransitionType } from "../config/transitions/TransitionType";
import Util from "../util/Util";

export class SparklerConfig extends EffectConfig {
    constructor(values: {[key: string]: any}) {
        super(values);
        this.params["StartTime"] = CommonParams.startTime(values);
        this.params["Duration"] = CommonParams.number("Duration", values);
        this.params["Colors"] = CommonParams.color("Colors", values, { isArray: true });
        this.params["Transition"] = CommonParams.transition("Transition", values);
        this.params["Triggers"] = CommonParams.triggers("Triggers", values);
        this.params["Singleton"] = CommonParams.singleton("Singleton", values);
        this.params["Priority"] = CommonParams.priority(values);

        this.params["TargetsLevel1"] = CommonParams.targets("TargetsLevel1", values);
        this.params["TargetsLevel2"] = CommonParams.targets("TargetsLevel2", values);
        this.params["TargetsLevel3"] = CommonParams.targets("TargetsLevel3", values);
        this.params["DensityLevel1"] = CommonParams.number("DensityLevel1", values);
        this.params["DensityLevel2"] = CommonParams.number("DensityLevel2", values);
        this.params["DensityLevel3"] = CommonParams.number("DensityLevel3", values);
    }
}

export default class SparklerEffect extends RunnableEffect {
    public type: RunnableEffectType = "sparkler";

    public getInstructions(t: number, note?: MidiDrumNote): LedInstruction[] {
        const instrs: LedInstruction[] = [];
        const targets = [this.config.params?.TargetsLevel1?.val,
                         this.config.params?.TargetsLevel2?.val,
                         this.config.params?.TargetsLevel3?.val] as EffectTarget[][];

        const densities = [this.config.params?.DensityLevel1?.val,
            this.config.params?.DensityLevel2?.val,
            this.config.params?.DensityLevel3?.val
        ];

        targets.forEach((target, i) => {
            const color = new ColorTransitionEffect(new ColorTransitionConfig({
                starttime: note?.time ?? this.config.params.StartTime?.val,
                colors: this.config.params?.Colors?.val ?? [],
                period: this.config.params.Duration.val,
            })).getInstructions(t, note);

            const amplitude = 1;

            const ledPositions = this.sparkle(t, densities[i], target);
            instrs.push(new LedInstruction(color.rgb, amplitude, ledPositions, this.config.params.Priority?.val));
        });

        return instrs;
    }

    public isComplete(t: number) {
        const startTime = this.config.params.StartTime.val;
        const period = this.config.params.Duration.val;
        
        const dt = t - startTime;
        return dt > period;
    }

    private sparkle(t: number, density: number, targets: EffectTarget[]): number[] {
        const startTime = this.config.params.StartTime.val;
        const ledSelector = new LEDSelector();
        const transition = this.config.params.Transition?.val as TransitionType;
        const period = this.config.params.Duration?.val as number;
        const pos: number[] = [];

        for (let target of targets) {
            const tempPos: number[] = [];
            const tNorm = 1 - Transitions.get(transition).getTNorm(t, startTime, period);
            const targetPos = ledSelector.getAllTargetPositions(target);
            const numLeds = targetPos.length;
            
            const scaledDensity = Math.floor(density * tNorm);
            for (let sparkle of Util.range(0, scaledDensity)) {
                const randomLed = ledSelector.unalias(target, Math.round(Math.random() * (numLeds - 1)));
                tempPos.push(randomLed);
            }

            pos.push(...tempPos);
        }
        return pos;
    }
}