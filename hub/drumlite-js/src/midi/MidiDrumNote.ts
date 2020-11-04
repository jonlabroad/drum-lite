import { HitType } from "./HitType";

export default class MidiDrumNote {
    status: number;
    note: HitType;
    velocity: number;
    time: Date;

    constructor(status: number, midiNote: number, velocity: number, time: Date) {
        this.status = status;
        this.note = midiNote as HitType;
        this.velocity = velocity;
        this.time = time;
    }

    public static fromRawNote(rawNote: number[], time: Date) {
        const status = rawNote[0];
        const midiNoteNum = rawNote[1];
        const velocity = rawNote[2];
        return new MidiDrumNote(status, midiNoteNum, velocity, time);
    }

    /*
    public static toFlewpMessage(rawNote: number[], time: Date) {
        const device = "TD50";
        const arr = new ArrayBuffer(4);
        const view = new DataView(arr);
        view.setUint8(0, rawNote[0]);
        view.setUint8(1, rawNote[1]);
        view.setUint8(2, rawNote[2]);
        console.log({
            status: rawNote[0],
            midiNoteNum: rawNote[1],
            velocity: rawNote[2]
        })
        const view32 = new Uint32Array(arr);
        return `${device}\$${view32[0]}$000000`;
    }
    */

    public isNoteOn() {
        return (this.status & 16) != 0;
    }
}