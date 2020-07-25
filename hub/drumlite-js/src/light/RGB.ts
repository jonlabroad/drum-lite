export default class RGB {
    r: number;
    g: number;
    b: number;

    constructor(r: number = 0, g: number = 0, b: number = 0, scale = 1.0) {
        this.r = Math.round(r * scale);
        this.b = Math.round(b * scale);
        this.g = Math.round(g * scale);
    }

    public add(other: RGB) {
        this.r = this.r + other.r;
        this.g = this.g + other.g;
        this.b = this.b + other.b;
    }

    public static fromRGB(rgb: RGB) {
        return new RGB(rgb.r, rgb.g, rgb.b);
    }

    public static fromArray(rgb: number[]) {
        return new RGB(rgb[0], rgb[1], rgb[2]);
    }

    public toArray(): number[] {
        return [this.r, this.g, this.b];
    }
}