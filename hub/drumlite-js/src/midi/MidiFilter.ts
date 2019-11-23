import MidiDrumNote from "./MidiDrumNote";

export default class MidiFilter {
    recentNotes: MidiDrumNote[] = [];
    
    static readonly noteHistoryLengthMillis = 1000;
    static readonly doubleHitThresholdMillis = 100;

    public filterNote(note: MidiDrumNote) {
        this.cleanHistory();
        let filteredNote = this.filterOutNoteOff(note);
        filteredNote = this.filterOutNoteOff(filteredNote);
        filteredNote = this.filterOutDoubleHits(filteredNote);
        if (filteredNote) {
            this.recentNotes.push(filteredNote)
        }

        return filteredNote
    }

    private cleanHistory() {
        const t = new Date();
        this.recentNotes = this.recentNotes.filter(n => t.getTime() - n.time.getTime() < MidiFilter.noteHistoryLengthMillis, this.recentNotes);
    }

    private filterOutDoubleHits(note?: MidiDrumNote): MidiDrumNote | undefined {
        if (!note) {
            return undefined;
        }

        const t = new Date();
        const duplicates = this.recentNotes.filter(n => note.note == n.note && t.getTime() - n.time.getTime() < MidiFilter.doubleHitThresholdMillis);
        if (duplicates.length > 0) {
            return undefined;
        }
        return note;
    }

    private filterOutNoteOff(note?: MidiDrumNote): MidiDrumNote | undefined {
        if (!note) {
            return undefined;
        }

        if (!note.isNoteOn()) {
            return undefined;
        }
        return note;
    }
}