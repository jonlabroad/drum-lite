import { EffectPriority } from "./EffectPriority";
import { HitType } from "../../midi/HitType";

export type ParameterType = "number" | "boolean" | "string" | "rgb" | "target" | "priority" | "hittype" | "transition";

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

export const defaultAmplitudeRange: EffectParameterRange = {
    min: 0,
    max: 3.0,
    inc: 0.01
}

export const defaultMillisecondRange: EffectParameterRange = {
    min: 0,
    max: 10000,
    inc: 50
}

export const defaultLedRange: EffectParameterRange = {
    min: 0,
    max: 60,
    inc: 1
}

export const defaultSymmetryRange: EffectParameterRange = {
    min: 1,
    max: 25,
    inc: 1
}

export const defaultPercentageRange: EffectParameterRange = {
    min: 0,
    max: 100,
    inc: 1
}

const defaultOptions = new EffectParameterOptions();

export class EffectOptions {
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