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
            EffectTarget.TOM2,
            EffectTarget.TOM3,
        ],
        color: new RGB(200, 100, 200),
        amplitude: 1,
        period: 2000,
        number: 8,
        speed: 1,
        offset: 0,
        transition: "cubicEaseInOut"
    }));
/*
    const racerEffect2 = new RacerEffect(new RacerConfig({
        starttime: startTime.getTime(),
        targets: [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM2,
            EffectTarget.TOM3,
        ],
        color: new RGB(100, 200, 50),
        amplitude: 1,
        period: 2000,
        number: 8,
        speed: 1,
        offset: 1,
        transition: "cubicEaseInOut"
    }));

    const racerEffect3 = new RacerEffect(new RacerConfig({
        starttime: startTime.getTime(),
        targets: [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM2,
            EffectTarget.TOM3,
        ],
        color: new RGB(50, 50, 200),
        amplitude: 1,
        period: 2000,
        number: 8,
        speed: 1,
        offset: 2,
        transition: "cubicEaseInOut"
    }));
*/
    const activator = new EffectActivator();
    const websocketsDriver = new WebsocketsDriver();
    websocketsDriver.connect(
        "ws://drumlite-hub.jdl.local:3000",
        (data: any) => {}
    );
    const effectRunner = new EffectRunner(activator, websocketsDriver, {
        periodMillis: 10
    });
    activator.addAmbientEffects([racerEffect]);//, racerEffect2, racerEffect3]);
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
