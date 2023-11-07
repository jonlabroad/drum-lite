import MidiDrumNote from "../midi/MidiDrumNote";
import RunnableEffect from "./RunnableEffect";
import { HitType } from "../midi/HitType";
import EffectFactory from "../library/EffectFactory";
import EffectConfig from "../config/EffectConfig";
import EffectModifier from "../library/elements/modifiers/EffectModifier";
import ModifierFactory from "../library/ModifierFactory";

export default class EffectActivator {
    protected activeEffects: RunnableEffect[] = [];
    protected triggeredEffects: RunnableEffect[] = [];
    protected ambientEffects: RunnableEffect[] = [];
    protected modifiers: EffectModifier[] = [];
    protected activeModifiers: EffectModifier[] = [];

    public addAmbientEffects(ambientEffects: RunnableEffect[]) {
        this.ambientEffects.push(...ambientEffects);
    }

    public addTriggeredEffects(effects: RunnableEffect[]) {
        this.triggeredEffects.push(...effects);
    }

    public addModifiers(modifiers: EffectModifier[]) {
        this.modifiers.push(...modifiers);
    }

    public handleNote(note: MidiDrumNote) {
        try {
            console.log({ isNoteOn: note.isNoteOn(), note: note.note, drumnote: note })
            if (note.isNoteOn()) {
                const effectsToTrigger = this.triggeredEffects.filter(effect => {
                    const triggers = effect.config.params['Triggers']?.val as HitType[] | undefined;
                    return triggers?.includes(note.note) ?? false;
                });
                console.log({ effectsToTrigger });

                const newEffects = effectsToTrigger.map(e => {
                    const copy = EffectFactory.create(e.type, {
                        ...e.config.values,
                        starttime: new Date().getTime()
                    });
                    return copy;
                }).filter(e => !!e) as RunnableEffect[];

                newEffects.forEach(e => this.removeConflictingEffects(note, e));
                this.activeEffects.push(...newEffects);

                const modifiersToTrigger = this.modifiers.filter(effect => {
                    const triggers = effect.config.params['Triggers']?.val as HitType[] | undefined;
                    return triggers?.includes(note.note) ?? false;
                });
                const newModifiers = modifiersToTrigger.map(m => {
                    const copy = ModifierFactory.create(m.type, {
                        ...m.config.values,
                        starttime: new Date().getTime()
                    });
                    return copy;
                }).filter(m => !!m) as EffectModifier[];
                newModifiers.forEach(e => this.removeConflictingMods(note, e));
                this.activeModifiers.push(...newModifiers);
            }
        } catch (err) {
            console.error("An error occurred", err);
        }
    }

    public getCurrentActiveEffects() {
        const t = new Date().getTime();
        this.activeEffects = this.activeEffects.filter(activeEffect => !activeEffect.isComplete(t));
        return [...this.activeEffects, ...this.ambientEffects];
    }

    public getCurrentActiveModifiers() {
        const t = new Date().getTime();
        this.activeModifiers = this.activeModifiers.filter(mod => !mod.isComplete(t));
        return [...this.activeModifiers];
    }

    private removeConflictingEffects(note: MidiDrumNote, newEffect: RunnableEffect) {
        this.activeEffects = this.activeEffects.filter(e => {
            return !(e.type === newEffect.type &&
                    (e.config.params["Singleton"]?.val ?? false) &&
                    (newEffect.config.params["Singleton"]?.val ?? false) &&
                    (e.config.params['Triggers']?.val ?? []).includes(note.note));
        })
    }

    private removeConflictingMods(note: MidiDrumNote, newEffect: EffectModifier) {
        this.activeModifiers = this.activeModifiers.filter(e => {
            return !(e.type === newEffect.type &&
                    (e.config.params["Singleton"]?.val ?? false) &&
                    (newEffect.config.params["Singleton"]?.val ?? false) &&
                    (e.config.params['Triggers']?.val ?? []).includes(note.note));
        })
    }
}