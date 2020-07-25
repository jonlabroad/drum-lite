export default class ScaleFunctions {
    public static linear(t: number, startTime: number, duration: number) {
        const dt = this.wrap(t - startTime, duration);
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
        const dt = this.wrap(t - startTime, duration);
        const tNorm = (1 - dt / duration);
        return 1 - tNorm * tNorm * tNorm;
    }

    public static cubicEaseInOut(currentVal: number, startVal: number, length: number) {
        const dv = this.wrap(currentVal - startVal, length);
        const vNorm = dv / length;
        if (vNorm < 0.5) {
            const vCalc = vNorm * 2;
            return vCalc * vCalc * vCalc / 2;
        }
        const vCalc = 2 - 2 * vNorm;
        return 1 - vCalc * vCalc * vCalc / 2;
    }

    protected static wrap(dt: number, duration: number): number {
        const numWrap = Math.abs(Math.floor(dt/duration));
        if (dt > duration) {
            dt -= duration * numWrap;
        }

        if (dt < 0) {
            dt += duration * numWrap;
        }
        return dt;
    }
}
