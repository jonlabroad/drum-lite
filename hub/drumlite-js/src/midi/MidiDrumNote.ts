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

    public isNoteOn() {
        return (this.status & 16) != 0;
    }
}