export default class RGB {
    r: number;
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.b = b;
        this.g = g;
    }

    public add(other: RGB) {
        this.r = this.r + other.r;
        this.g = this.g + other.g;
        this.b = this.b + other.b;
    }

    public static fromArray(rgb: number[]) {
        return new RGB(rgb[0], rgb[1], rgb[2]);
    }

    public toArray(): number[] {
        return [this.r, this.g, this.b];
    }
}