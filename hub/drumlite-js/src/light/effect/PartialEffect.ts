import ResolvedEffect from "../../effect/ResolvedEffect";
import JsonEffectConfig from "./JsonEffectConfig";
import { EffectPriority } from "../../effect/EffectPriority";
import { HitType } from "../../midi/HitType";
import MidiDrumNote from "../../midi/MidiDrumNote";

export type ParameterType = "number" | "boolean" | "string" | "rgb" | "target" | "priority" | "hittype";

export class EffectParameterOptions {
    type?: ParameterType = "number";
    isArray?: boolean = false;
    isHidden?: boolean = false;
    range?: EffectParameterRange = defaultAmplitudeRange
}

export interface EffectParameterRange {
    min: number
    max: number
    inc: number
}

export const defaultAmplitudeRange = {
    min: 0,
    max: 3.0,
    inc: 0.01
}

export const defaultMillisecondRange = {
    min: 0,
    max: 10000,
    inc: 50
}

export const defaultLedRange = {
    min: 0,
    max: 60,
    inc: 1
}

export const defaultSymmetryRange = {
    min: 1,
    max: 25,
    inc: 1
}

export const defaultPercentageRange = {
    min: 0,
    max: 100,
    inc: 1
}

const defaultOptions = new EffectParameterOptions();

export class EffectOptions {
    isAmbient: boolean = false
    isJit?: boolean = false
    isModifier: boolean = false
    startTime: number = 0
    priority: EffectPriority = EffectPriority.MEDIUM
    triggers: HitType[] = []
    minTriggerVelocity: number = 0
}

export class EffectParameter<T> {
    paramName: string
    val: T
    options: EffectParameterOptions

    constructor(paramName: string, val: T, options?: EffectParameterOptions) {
        this.paramName = paramName;
        this.val = val;
        const inOptions = options || new EffectParameterOptions();
        this.options = {...defaultOptions, ...inOptions};
    }
}

export class EffectParameters {
    public effectName: string = "Unknown"
    public typeName: string = "Unknown"

    public params: {
        startTime: EffectParameter<number>
        isAmbient: EffectParameter<boolean>
        isJit: EffectParameter<boolean>
        priority: EffectParameter<EffectPriority>
        triggers: EffectParameter<HitType[]>
        minTriggerVelocity: EffectParameter<number>
        [key: string]: EffectParameter<any>
    } = {
        startTime: new EffectParameter<number>("Start Time", 0, {type: "number", isHidden: true}),
        isAmbient: new EffectParameter<boolean>("Is Ambient", true, {type: "boolean", isHidden: true}),
        isJit: new EffectParameter<boolean>("Is JIT", false, {type: "boolean", isHidden: false}),
        isModifier: new EffectParameter<boolean>("Is Modifier", true, {type: "boolean", isHidden: true}),
        priority: new EffectParameter<EffectPriority>("Priority", EffectPriority.MEDIUM, {isHidden: true, type: "priority"}),
        triggers: new EffectParameter<HitType[]>("Triggers", [], {isHidden: true, type: "hittype", isArray: true}),
        minTriggerVelocity: new EffectParameter<number>("Trigger Velocity", 0, {isHidden: false, type: "number", isArray: false})
    }

    constructor(effectOptions?: EffectOptions) {
        if (effectOptions) {
            this.params.startTime.val = effectOptions.startTime;
            this.params.isAmbient.val = effectOptions.isAmbient;
            this.params.priority.val = effectOptions.priority;
            this.params.triggers.val = effectOptions.triggers;
            this.params.isModifier.val = effectOptions.isModifier;
            this.params.isJit.val = effectOptions?.isJit ?? false;
            this.params.minTriggerVelocity.val = effectOptions?.minTriggerVelocity ?? 0;
        }
    }
}

export default class PartialEffect<T extends EffectParameters> {
    public params: T;

    constructor(params: T, startTime: number) {
        this.params = params;
        this.params.params.startTime.val = startTime;
    }

    public getEffect(t: number, note?: MidiDrumNote): ResolvedEffect[][] {
        return [];
    }

    public isTemporal(): boolean {
        return false;
    }

    public isComplete(t: number, note?: MidiDrumNote) {
        return false;
    }

    public isJit(): boolean {
        return this.params?.params?.isJit?.val ?? false;
    }

    public getAmbientDuration(): number {
        return 0;
    }

    public fromJson(json: string) {
        const config = JSON.parse(json) as JsonEffectConfig;
        this.params = {...this.params, ...config.parameters};
    }

    protected getStartTime(note?: MidiDrumNote) {
        return note ? note.time.getTime() : this.params.params.startTime.val;
    }
}