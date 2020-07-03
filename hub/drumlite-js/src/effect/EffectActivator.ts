import MidiDrumNote from "../midi/MidiDrumNote";
import RunnableEffect from "./RunnableEffect";

export default class EffectActivator {
    protected triggeredEffects: RunnableEffect[] = [];
    protected ambientEffects: RunnableEffect[] = [];

    public addAmbientEffects(ambientEffects: RunnableEffect[]) {
        this.ambientEffects.push(...ambientEffects);
    }

    public handleNote(note: MidiDrumNote) {
        console.log({note});
        // TODO
    }

    public getCurrentActiveEffects() {
        const t = new Date().getTime();
        this.triggeredEffects.filter(triggeredEffect => !triggeredEffect.isComplete(t));
        return [...this.triggeredEffects, ...this.ambientEffects];
    }
}