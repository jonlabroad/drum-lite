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
}
