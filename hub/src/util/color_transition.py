from light.rgbw import RGBW

class ColorTransition:
    @staticmethod
    def linear(tNorm, srcRgb, dstRgb):
        r = (1 - tNorm) * srcRgb.r + tNorm * dstRgb.r
        g = (1 - tNorm) * srcRgb.g + tNorm * dstRgb.g
        b = (1 - tNorm) * srcRgb.b + tNorm * dstRgb.b
        return RGBW(int(r), int(g), int(b), 0)