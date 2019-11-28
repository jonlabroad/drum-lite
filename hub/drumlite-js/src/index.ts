import Midi from "./midi/Midi";
import MidiMessageHandler from "./midi/MidiMessageHandler";
import EffectActivator from "./effect/EffectActivator";
import TestConfig from "./effects/TestConfig";
import EffectCompiler from "./effect/EffectCompiler";
import EffectRunner from "./effect/EffectRunner";
import TronConfig from "./effects/TronConfig";
import WebsocketsDriver from "./light/drivers/WebsocketsDriver";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    //const config = new TestConfig();
    const config = new TronConfig();
    const compiled = new EffectCompiler(config).compile();
    const effectActivator = new EffectActivator(compiled);
    const msgHandler = new MidiMessageHandler(effectActivator);
    const midi = new Midi(msgHandler.handleMessage.bind(msgHandler));
    midi.openPort();

    const ledDriver = new WebsocketsDriver();
    ledDriver.connect();
    const runner = new EffectRunner(effectActivator, ledDriver);
    await runner.run();
}

main();
