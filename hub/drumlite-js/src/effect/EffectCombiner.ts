import PartialEffect from "../light/effect/PartialEffect";
import ResolvedEffect from "./ResolvedEffect";
import RGB from "../light/RGB";

export default class EffectCombiner {
    unresolvedEffects: PartialEffect<any>[];
    
    constructor(effects: PartialEffect<any>[]) {
        this.unresolvedEffects = effects;
    }

    public combine(dt: number) {
        const color = this.combineColors(dt);
        const amplitude = this.combineAmplitude(dt);
        const ledPositions = this.combinePositions(dt);
        return new ResolvedEffect(color, amplitude, ledPositions);
    }

    public combineColors(dt: number) {
        const combinedColor = new RGB(0, 0, 0);
        for (let unresolvedEffect of this.unresolvedEffects) {
            const resolvedEffect = unresolvedEffect.getEffect(dt);
            if (resolvedEffect.rgb) {
                combinedColor.add(resolvedEffect.rgb);
            }
        }
        return combinedColor
    }

    public combineAmplitude(dt: number) {
        let amplitude = 0;
        for (let unresolvedEffect of this.unresolvedEffects) {
            const resolvedEffect = unresolvedEffect.getEffect(dt);
            if (resolvedEffect.amplitude) {
                amplitude = amplitude + resolvedEffect.amplitude;
            }
        }
        return amplitude;
    }

    public combinePositions(dt: number): number[] {
        const positions: number[] = [];
        for (let unresolvedEffect of this.unresolvedEffects) {
            const resolvedEffect = unresolvedEffect.getEffect(dt);
            if (resolvedEffect.ledPositions) {
                positions.push(...resolvedEffect.ledPositions);
            }
        }
        return [...new Set<number>(positions).keys()];
    }
}
