import IRemoteDriver from "./IRemoteDriver";
import Util from "../util/Util";
import LedInstruction from "../effect/LedInstruction";

export default class InstructionExecutor {
    static readonly ledsOnStrip = 160;

    private pixels: Record<number, number[]>;
    private previousLedEffects: Map<number, number[]>;
    private driverImpl: IRemoteDriver;

    constructor(driverImpl: IRemoteDriver) {
        this.pixels = {};
        for (let i = 0; i < InstructionExecutor.ledsOnStrip; i++) {
            this.pixels[i] = [0,0,0];
        }
        this.previousLedEffects = new Map<number, number[]>();
        this.driverImpl = driverImpl;
    }

    public runEffects(effectsMap: Record<number, LedInstruction[]>) {
        let numSamples = 0;

        const effectsToApply: Map<number, number[]> = new Map<number, number[]>();
        for (let ledIdStr in effectsMap) {
            const ledId = parseInt(ledIdStr);
            for (let effect of effectsMap[ledId]) {
                // Note, this assumes there is only one effect per led, which is what *should* be the case, but is dependent on the effects themselves
                if (effect.rgb) {
                    numSamples = numSamples + 1;

                    const r = Math.max(0, effect.rgb.r);
                    const g = Math.max(0, effect.rgb.g);
                    const b = Math.max(0, effect.rgb.b);
                    const amplitude = Math.max(0, effect.amplitude || 1.0);
                    const rgb = this.scaleByAmplitude([r, g, b], amplitude);
                    effectsToApply.set(ledId, [Math.min(255, rgb[0]), Math.min(255, rgb[1]), Math.min(255, rgb[2])]);
                }
            }
        }

        const allLeds = new Set<number>(Util.range(0, InstructionExecutor.ledsOnStrip));
        const drivenLeds = new Set<number>(effectsToApply.keys());
        const ledsNotDriven = new Set<number>([...allLeds].filter(led => !drivenLeds.has(led)));
        for (let ledId of ledsNotDriven) {
            effectsToApply.set(ledId, [0, 0, 0]);
        }

        let driveLeds = false;
        for (let ledId of effectsToApply.keys()) {
            const e = effectsToApply.get(ledId);
            if (e) {
                const prev = this.previousLedEffects.get(ledId);
                if (!prev || e[0] !== prev[0] || e[1] !== prev[1] || e[2] !== prev[2]) {
                    driveLeds = true;
                    break;
                }
            }
        }

        if (driveLeds) {
            for (let ledId of effectsToApply.keys()) {
                const e = effectsToApply.get(ledId);
                if (e) {
                    this.pixels[ledId] =  e;
                    this.previousLedEffects.set(ledId, e);
                }
            }
            const sendSuccess = this.driverImpl.send('command_leds', this.pixels);
            if (!sendSuccess) {
                this.previousLedEffects.clear();
            }
        }
    }

    public clear() {
        this.pixels = {};
        for (let i = 0; i < InstructionExecutor.ledsOnStrip; i++) {
            this.pixels[i] = [0,0,0];
        }
        this.driverImpl.send('command_leds', this.pixels);
    }

    private scaleByAmplitude(rgb: number[], amplitude: number) {
        const maxValue = Math.max(rgb[0], rgb[1], rgb[2]);
        if (maxValue <= 0) {
            return rgb;
        }

        const maxAmplitude = Math.min(255 / maxValue, amplitude);
        const newRgb = [Math.floor(rgb[0] * maxAmplitude), Math.floor(rgb[1] * maxAmplitude), Math.floor(rgb[2] * maxAmplitude)];
        return newRgb;
    }
}