import PartialEffect, { EffectParameters, EffectParameter, defaultMillisecondRange } from "../PartialEffect"
import RGB from "../../RGB"
import ResolvedEffect from "../../../effect/ResolvedEffect";
import ColorTransition from "../../../util/ColorTransition";
import ScaleFunctions from "../../../util/ScaleFunctions";
import MidiDrumNote from "../../../midi/MidiDrumNote";

export class NColorTransitionParams extends EffectParameters {
    effectName = "Generic N Color Transition";
    typeName = "Color";

    constructor(colors: RGB[] = [], duration: number = 1000, offset:number = 0) {
        super();
        this.params.colors = new EffectParameter<RGB[]>("Colors", colors, {type: "rgb", isArray: true});
        this.params.duration = new EffectParameter<number>("Duration", duration, {range: defaultMillisecondRange});
        this.params.offset = new EffectParameter<number>("Offset", offset, {range: defaultMillisecondRange});
    }
}

export default class NColorTransition extends PartialEffect<NColorTransitionParams> {
    constructor(params: NColorTransitionParams, dt = 0) {
        super(params, dt);
    }
    
    findColor(tNorm: number): RGB {
        const { colors } = this.params.params;

        const scaledTNorm = tNorm * colors.val.length;
        const startColorNum = Math.floor(scaledTNorm) % colors.val.length;
        const endColorNum = Math.ceil(scaledTNorm) % colors.val.length;
        const relativeColorT = scaledTNorm - startColorNum;
        return ColorTransition.linear(relativeColorT, colors.val[startColorNum], colors.val[endColorNum]);
    }

    getEffect(t: number) {
        const { params } = this.params;
        const tWrapped = t - Math.floor(t / params.duration.val) * params.duration.val;
        const tNorm = ScaleFunctions.linear(tWrapped + params.offset.val, params.startTime.val, params.duration.val);
        const color = this.findColor(tNorm);
        
        return [[ResolvedEffect.createRgb(color)]];
    }

    public isTemporal(): boolean {
        return !!this.params.params.duration.val;
    }

    public isComplete(t:  number, note?: MidiDrumNote) {
        if (note && note.velocity < this.params.params.minTriggerVelocity.val) {
            return true;
        }

        if (this.params.params.duration.val) {
            return t > this.params.params.duration.val;
        }
        return true;
    }
}