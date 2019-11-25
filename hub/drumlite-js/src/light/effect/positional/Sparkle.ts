import { EffectTarget } from "../EffectTarget"
import PartialEffect from "../PartialEffect"
import ScaleFunctions from "../../../util/ScaleFunctions";
import LEDSelector from "../../LEDSelector";
import Util from "../../../util/Util";
import ResolvedEffect from "../../../effect/ResolvedEffect";

export default class Sparkle extends PartialEffect {
    targets: EffectTarget[];
    startingDensity: number;
    sparkleSize: number;
    duration: number;
    
    constructor(targets: EffectTarget[], startingDensity: number, sparkleSize: number, duration: number) {
        super("Sparkle", "Positional");
        this.targets = targets;
        this.startingDensity = startingDensity;
        this.sparkleSize = sparkleSize;
        this.duration = duration;
    }

    public getEffect(t: number) {
        const ledSelector = new LEDSelector();
        const pos: number[] = [];
        for (let target of this.targets) {
            const tempPos: number[] = [];
            const tNorm = 1 - ScaleFunctions.linear(t, this.startTime, this.duration);
            const targetPos = ledSelector.getAllTargetPositions(target);
            const numLeds = targetPos.length;
            
            const scaledDensity = Math.floor(this.startingDensity * tNorm);
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
        return t > this.duration;
    }
}
