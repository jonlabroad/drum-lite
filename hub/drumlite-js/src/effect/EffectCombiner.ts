import PartialEffect from "../light/effect/PartialEffect";
import ResolvedEffect from "./ResolvedEffect";
import RGB from "../light/RGB";

export default class EffectCombiner {
    unresolvedEffects: PartialEffect<any>[];
    
    constructor(effects: PartialEffect<any>[]) {
        this.unresolvedEffects = effects;
    }

    public combine(dt: number): ResolvedEffect[] {
        const resolvedEffects: ResolvedEffect[] = [];
        let color = new RGB();
        let amplitude = 0;
        let ledPositions: number[] = [];
        this.unresolvedEffects.forEach(unresolvedEffectGroup => {
            unresolvedEffectGroup.getEffect(dt).forEach(resolvedEffect => {
                color = this.combineColors(resolvedEffect, dt, color);
                amplitude = this.combineAmplitude(resolvedEffect, dt, amplitude);
                ledPositions = this.combinePositions(resolvedEffect, dt, ledPositions);
            });
        });
        resolvedEffects.push(new ResolvedEffect(color, amplitude, ledPositions));
        if (this.unresolvedEffects.find(e => e.isJit())) {
            console.log({resolved: resolvedEffects});
        }
        return resolvedEffects;
    }

    public combineColors(effectGroup: ResolvedEffect[], dt: number, color: RGB) {
        for (let effect of effectGroup) {
            if (effect.rgb) {
                color.add(effect.rgb);
            }
        }
        return color;
    }

    public combineAmplitude(effectGroup: ResolvedEffect[], dt: number, amplitude: number) {
        for (let effect of effectGroup) {
            if (effect.amplitude) {
                amplitude = amplitude + effect.amplitude;
            }
        }
        return amplitude;
    }

    public combinePositions(effectGroup: ResolvedEffect[], dt: number, positions: number[]): number[] {
        for (let effect of effectGroup) {
            if (effect.ledPositions) {
                positions.push(...effect.ledPositions);
            }
        }
        return [...new Set<number>(positions).keys()];
    }
}
