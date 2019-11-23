import RGB from "../light/RGB"

export default class ResolvedEffect {
    rgb?: RGB;
    amplitude?: number;
    ledPositions?: number[];
    
    constructor(rgb?: RGB, amplitude?: number, ledPositions?: number[]) {
       this.rgb = rgb;
       this.amplitude = amplitude;
       this.ledPositions = ledPositions;
    }

    public static createRgb(rgb: RGB) {
        return new ResolvedEffect(rgb, undefined, undefined);
    }

    public static createAmplitude(amplitude: number) {
        return new ResolvedEffect(undefined, amplitude, undefined);
    }

    public static createTranslation(ledPositions: number[]) {
        return new ResolvedEffect(undefined, undefined, ledPositions);
    }

    public toString() {
        return `${[this.rgb ? this.rgb : undefined, this.amplitude, this.ledPositions]}`;
    }
}