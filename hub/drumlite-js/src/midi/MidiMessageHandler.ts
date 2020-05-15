import MidiDrumNote from "./MidiDrumNote";
import MidiFilter from "./MidiFilter";

export default class MidiMessageHandler {
//    activator: EffectActivator;
    //filter: MidiFilter;
/*
    constructor(activator: EffectActivator) {
        this.activator = activator;
        this.filter = new MidiFilter();
    }

    public handleMessage(deltaTime: number, message: number[]) {
        const date = new Date();
        let note: MidiDrumNote | undefined = MidiDrumNote.fromRawNote(message, date);
        note = this.filter.filterNote(note);
        if (note) {
            this.activator.handleNote(note);
        }
    }
*/
}