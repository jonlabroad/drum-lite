export default class ScaleFunctions {
    public static linear(t: number, startTime: number, duration: number) {
        const dt = t - startTime;
        return dt / duration;
    }

    public static cubicEaseOut(t: number, startTime: number, duration: number) {
        const dt = t - startTime;
        const tNorm = (1 - dt / duration);
        return 1 - tNorm * tNorm * tNorm;
    }
}
