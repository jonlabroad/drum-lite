import WebsocketsDriver from "./driver/WebsocketsDriver";
import EffectRunner from "./effect/EffectRunner";
import EffectActivator from "./effect/EffectActivator";
import Midi from "./midi/Midi";
import MidiDrumNote from "./midi/MidiDrumNote";
import Tron from "./library/config/Tron";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    const timestepMillis = 20;
    const config = new Tron();
    const configEffects = config.getEffects();

    const activator = new EffectActivator();

    const midi = new Midi((dt, msg) => {
        const note = MidiDrumNote.fromRawNote(msg, new Date());
        activator.handleNote(note);
    });
    midi.openPort();

    const websocketsDriver = new WebsocketsDriver();
    websocketsDriver.connect(
        "ws://drumlite-hub.jdl.local:3000",
        (data: any) => {}
    );
    const effectRunner = new EffectRunner(activator, websocketsDriver, {
        periodMillis: timestepMillis
    });
    activator.addAmbientEffects(configEffects.ambient);//, racerEffect2, racerEffect3]);
    activator.addTriggeredEffects(configEffects.triggered);
    await effectRunner.run();

/*
    websocketsDriver.connect(
        "ws://10.0.0.27:3000",
        (data: any) => {},
        async () => {
            while(true) {
                const t = new Date().getTime();
                // TODO EffectRunner does this (after resolving priorities)
                const instrs = racerEffect.getInstructions(t);
                const mappedInstr: {[key: number]: LedInstruction[]} = {};
                instrs.forEach(instr => {
                    instr.ledPositions?.forEach(pos => {
                        const mappedElement: LedInstruction[] = mappedInstr[pos] ?? [];
                        mappedElement.push(instr);
                        mappedInstr[pos] = mappedElement;
                    })
                });

                driver.runEffects(mappedInstr);
                await Util.sleep(10);
            }
            
        }
    );
*/
}
