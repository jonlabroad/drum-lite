import RGB from "../light/RGB"

export default class ColorTransition {
    public static linear(tNorm: number, srcRgb: RGB, dstRgb: RGB) {
        const r = (1 - tNorm) * srcRgb.r + tNorm * dstRgb.r;
        const g = (1 - tNorm) * srcRgb.g + tNorm * dstRgb.g;
        const b = (1 - tNorm) * srcRgb.b + tNorm * dstRgb.b;
        return new RGB(Math.round(r), Math.round(g), Math.round(b));
    }
}
