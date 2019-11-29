import { EffectTarget } from "../EffectTarget"
import PartialEffect, { EffectParameters, EffectParameter } from "../PartialEffect"
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export class SparkleParams extends EffectParameters {
    targets = new EffectParameter<EffectTarget[]>("Targets", [], "target", true)
    density = new EffectParameter<number>("Density", 1)
    sparkleSize = new EffectParameter<number>("Sparkle Size", 1)
    duration = new EffectParameter<number>("Duration", 0)

    constructor(targets: EffectTarget[], density: number, sparkleSize: number, duration: number) {
        super(0);
        this.targets.val = targets;
        this.density.val = density;
        this.sparkleSize.val = sparkleSize;
        this.duration.val = duration;
    }
}

export default class Sparkle extends PartialEffect<SparkleParams> {
    constructor(params: SparkleParams, dt = 0) {
        super("Sparkle", "Positional", params, dt);
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.params.targets.val) {
            const tempPos: number[] = [];
            const tNorm = 1 - ScaleFunctions.linear(t, this.params.startTime.val, this.params.duration.val);
            const targetPos = ledSelector.getAllTargetPositions(target);
            const numLeds = targetPos.length;
            
            const scaledDensity = Math.floor(this.params.density.val * tNorm);
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
        return t > this.params.duration.val;
    }
}
