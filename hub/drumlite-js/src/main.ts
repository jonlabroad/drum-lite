import RacerEffect, { RacerConfig } from "./library/Racer";
import RGB from "./light/RGB";
import { EffectTarget } from "./config/EffectTarget";
import InstructionExecutor from "./driver/InstructionExecutor";
import DebugDriver from "./driver/DebugDriver";
import LedInstruction from "./effect/LedInstruction";
import WebsocketsDriver from "./driver/WebsocketsDriver";
import Util from "./util/Util";

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
        ["Start Time"]: startTime.getTime(),
        Targets: [
            EffectTarget.SNARE,
            EffectTarget.TOM1,
            EffectTarget.TOM2,
            EffectTarget.TOM3,
        ],
        Color: new RGB(200, 100, 200),
        Amplitude: 1,
        Period: 2000,
        Number: 5,
        Speed: 1,
        Offset: 0,
        Transition: "cubicEaseInOut"
    }));

    console.log(racerEffect.getInstructions(0));
    console.log(racerEffect.getInstructions(250));
    console.log(racerEffect.getInstructions(500));
    console.log(racerEffect.getInstructions(750));

    const websocketsDriver = new WebsocketsDriver();
    const driver = new InstructionExecutor(websocketsDriver);
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
    

}
