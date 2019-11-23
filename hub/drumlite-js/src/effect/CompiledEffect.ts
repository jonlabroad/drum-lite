import { HitType } from "../midi/HitType"
import ResolvedEffect from "./ResolvedEffect"
import { EffectPriority } from "./EffectPriority"

export default class CompiledEffect extends ResolvedEffect {
    dt: number;
    duration: number;
    hitTypes: HitType[];
    priority: EffectPriority;
    isAmbient: boolean;
    isModifier: boolean;
    noteTime: number;
    t: number;
    ambientDuration: number;

    constructor(hitTypes: HitType[], effect: ResolvedEffect, dt: number, duration: number, priority=EffectPriority.ANY, isAmbient=false, isModifier=false, noteTime=0, t=0, ambientDuration=0) {
        super(effect.rgb, effect.amplitude, effect.ledPositions);
        this.dt = dt
        this.duration = duration
        this.hitTypes = hitTypes
        this.priority = priority
        this.isAmbient = isAmbient
        this.isModifier = isModifier
        this.noteTime = noteTime
        this.t = t
        this.ambientDuration = ambientDuration
    }
}
