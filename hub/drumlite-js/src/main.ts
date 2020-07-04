import RacerEffect, { RacerConfig } from "./library/Racer";
import RGB from "./light/RGB";
import { EffectTarget } from "./config/EffectTarget";
import InstructionExecutor from "./driver/InstructionExecutor";
import DebugDriver from "./driver/DebugDriver";
import LedInstruction from "./effect/LedInstruction";
import WebsocketsDriver from "./driver/WebsocketsDriver";
import Util from "./util/Util";
import EffectRunner from "./effect/EffectRunner";
import EffectActivator from "./effect/EffectActivator";
import Midi from "./midi/Midi";
import MidiDrumNote from "./midi/MidiDrumNote";
import { HitType } from "./midi/HitType";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    const timestepMillis = 20;
    //const config = new TronConfig();
    const startTime = new Date();
    const racerEffect = new RacerEffect(new RacerConfig({
        starttime: startTime.getTime(),
        targets: [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM3,
        ],
        color: new RGB(200, 100, 200),
        period: 2000,
        number: 8,
        transition: "cubicEaseInOut"
    }));

    const racerEffect2 = new RacerEffect(new RacerConfig({
        starttime: startTime.getTime(),
        triggers: [
            HitType.TOM2
        ],
        targets: [
            EffectTarget.TOM2,
        ],
        color: new RGB(200, 100, 200),
        period: 2000,
        number: 8,
        transition: "cubicEaseInOut"
    }));

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
        periodMillis: 10
    });
    activator.addAmbientEffects([racerEffect]);//, racerEffect2, racerEffect3]);
    activator.addTriggeredEffects([racerEffect2]);
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
