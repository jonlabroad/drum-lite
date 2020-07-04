import MidiDrumNote from "../midi/MidiDrumNote";
import RunnableEffect from "./RunnableEffect";
import { HitType } from "../midi/HitType";
import EffectFactory from "../library/EffectFactory";
import EffectConfig from "../config/EffectConfig";

export default class EffectActivator {
    protected activeEffects: RunnableEffect[] = [];
    protected triggeredEffects: RunnableEffect[] = [];
    protected ambientEffects: RunnableEffect[] = [];

    public addAmbientEffects(ambientEffects: RunnableEffect[]) {
        this.ambientEffects.push(...ambientEffects);
    }

    public addTriggeredEffects(effects: RunnableEffect[]) {
        this.triggeredEffects.push(...effects);
    }

    public handleNote(note: MidiDrumNote) {
        if (note.isNoteOn()) {
            const effectsToTrigger = this.triggeredEffects.filter(effect => {
                const triggers = effect.config.params['Triggers']?.val as HitType[] | undefined;
                return triggers?.includes(note.note) ?? false;
            });
            this.activeEffects.push(...effectsToTrigger.map(e => {
                const copy = EffectFactory.create('racer', {
                    ...e.config.values,
                    starttime: new Date().getTime()
                });
                return copy;
            }).filter(e => !!e) as RunnableEffect[]);
        }
    }

    public getCurrentActiveEffects() {
        const t = new Date().getTime();
        this.activeEffects = this.activeEffects.filter(activeEffect => !activeEffect.isComplete(t));
        return [...this.activeEffects, ...this.ambientEffects];
    }
}