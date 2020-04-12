export default class ScaleFunctions {
    public static linear(t: number, startTime: number, duration: number) {
        const dt = t - startTime;
        let tNorm = dt / duration;
        if (tNorm > 1.0) {
            tNorm -= 1.0;
        }
        else if (tNorm < 0.0) {
            tNorm += 1.0;
        }
        return tNorm;
    }

    public static cubicEaseOut(t: number, startTime: number, duration: number) {
        const dt = t - startTime;
        const tNorm = (1 - dt / duration);
        return 1 - tNorm * tNorm * tNorm;
    }

    public static cubicEaseInOut(currentVal: number, startVal: number, length: number) {
        const dv = currentVal - startVal;
        const vNorm = dv / length;
        if (vNorm < 0.5) {
            const vCalc = vNorm * 2;
            return vCalc * vCalc * vCalc / 2;
        }
        const vCalc = 2 - 2 * vNorm;
        return 1 - vCalc * vCalc * vCalc / 2;
    }
}
