import RGB from "../light/RGB"

export default class LedInstruction {
    public rgb?: RGB;
    public amplitude?: number;
    public ledPositions?: number[];
    
    constructor(rgb?: RGB, amplitude?: number, ledPositions?: number[]) {
       this.rgb = rgb;
       this.amplitude = amplitude;
       this.ledPositions = ledPositions;
    }

    public toString() {
        return `${[this.rgb ? this.rgb : undefined, this.amplitude, this.ledPositions]}`;
    }
}