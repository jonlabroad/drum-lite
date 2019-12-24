import { EffectTarget } from "../EffectTarget"
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SparkleParams extends EffectParameters {
    effectName = "Sparkle";
    typeName = "Positional";

    constructor(targets: EffectTarget[] = [], density: number = 1, sparkleSize: number = 1, duration: number = 0) {
        super(0);
        this.params.targets = new EffectParameter<EffectTarget[]>("Targets", targets, "target", true)
        this.params.density = new EffectParameter<number>("Density", density)
        this.params.sparkleSize = new EffectParameter<number>("Sparkle Size", sparkleSize)
        this.params.duration = new EffectParameter<number>("Duration", duration)
    }
}

export default class Sparkle extends PartialEffect<SparkleParams> {
    constructor(params: SparkleParams, dt = 0) {
        super(params, dt);
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.params.params.targets.val) {
            const tempPos: number[] = [];
            const tNorm = 1 - ScaleFunctions.linear(t, this.params.params.startTime.val, this.params.params.duration.val);
            const targetPos = ledSelector.getAllTargetPositions(target);
            const numLeds = targetPos.length;
            
            const scaledDensity = Math.floor(this.params.params.density.val * tNorm);
            for (let sparkle of Util.range(0, scaledDensity)) {
                const randomLed = ledSelector.unalias(target, Math.round(Math.random() * (numLeds - 1)));
                tempPos.push(randomLed);
            }

            pos.push(...tempPos);
        }

        return ResolvedEffect.createTranslation([...new Set<number>(pos)]);
    }

    public isTemporal() {
        // Constant targets do not control timing
        return true;
    }

    public isComplete(t: number) {
        return t > this.params.params.duration.val;
    }
}
