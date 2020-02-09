import Midi from "./midi/Midi";
import MidiMessageHandler from "./midi/MidiMessageHandler";
import EffectActivator from "./effect/EffectActivator";
import EffectCompiler from "./effect/EffectCompiler";
import EffectRunner from "./effect/EffectRunner";
import WebsocketsDriver from "./light/drivers/WebsocketsDriver";
import RainbowRoadConfig from "./effects/RainbowRoadConfig";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    const timestepMillis = 50;
    //const config = new TronConfig();
    const config = new RainbowRoadConfig();
    config.init();
    const compiled = new EffectCompiler(config).compile();
    const effectActivator = new EffectActivator(compiled, [config], timestepMillis);
    const msgHandler = new MidiMessageHandler(effectActivator);
    const midi = new Midi(msgHandler.handleMessage.bind(msgHandler));
    midi.openPort();

    const ledDriver = new WebsocketsDriver();
    ledDriver.connect();
    const runner = new EffectRunner(effectActivator, ledDriver, {
        periodMillis: timestepMillis
    });
    await runner.run();
}
