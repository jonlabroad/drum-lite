import RGB from "../../RGB";
import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect";
import ResolvedEffect from "../../../effect/ResolvedEffect";
import { EffectTarget } from "../EffectTarget";

export class EmberParams extends EffectParameters {
    effectName = "Ember Generator";
    typeName = "Composed";

    constructor(
        targets: EffectTarget[] = [],
        period: number = 1,
        speed: number = 1,
        offset: number = 0,
        amplitude: number = 1,
        emberCreationPeriod: number = 500,
        emberDuration: number = 1000) {
        super();
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, {type: "target", isArray: true});
        this.params.period = new EffectParameter<number>("Period", period, {range: defaultMillisecondRange});
        this.params.speed = new EffectParameter<number>("Speed", speed);
        this.params.offset = new EffectParameter<number>("Offset", offset);
        this.params.amplitude = new EffectParameter<number>("Amplitude", amplitude);

        this.params.emberCreationPeriod = new EffectParameter<number>("Ember Creation Period", emberCreationPeriod, {range: defaultMillisecondRange})
        this.params.emberDuration = new EffectParameter<number>("Ember Duration", emberDuration, {range: defaultMillisecondRange});
    }
}

export interface Ember {
    position: number
    startTime: number
    rgb: RGB
}

export interface EmberGeneratorState {
    embers: Ember[]
}

export default class EmberGenerator extends PartialEffect<EmberParams> {
    constructor(params: EmberParams, dt: number = 0){
        super(params, dt);
    }

    public getEffect(t: number): ResolvedEffect[][] {
        return [[ResolvedEffect.createAmplitude(this.params.params.amplitude.val)]];
    }

    public isTemporal(): boolean {
        return !!this.params.params.durationMilliseconds.val;
    }

    public isComplete(t:  number) {
        if (this.params.params.durationMilliseconds.val) {
            return t > this.params.params.durationMilliseconds.val;
        }
        return true;
    }
}