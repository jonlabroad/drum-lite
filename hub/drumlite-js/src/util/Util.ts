import { EffectTarget } from "../light/effect/EffectTarget";

export default class Util {
    public static range(start: number, stop: number, inc: number = 1): number[] {
        const result = [];
        for (let n = start; n < stop; n++) {
            result.push(n);
        }
        return result;
    }

    public static allTargets() {
        return [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM2,
            EffectTarget.TOM3
        ];
    }

    public static async sleep(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    public static modulo(n: number, m: number) {
        return ((n % m) + m) % m;
    }
}