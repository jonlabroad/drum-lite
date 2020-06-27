import Midi from "./midi/Midi";
import MidiMessageHandler from "./midi/MidiMessageHandler";
import EffectActivator from "./effect/EffectActivator";
import EffectCompiler from "./effect/EffectCompiler";
import EffectRunner from "./effect/EffectRunner";
import WebsocketsDriver from "./light/drivers/WebsocketsDriver";
import RainbowRoadConfig from "./effects/RainbowRoadConfig";
import TronConfig from "./effects/TronConfig";
import WebsocketServer from "./util/WebsocketServer";
import CommandHandler, { CommandMessage } from "./util/CommandHandler";
import Util from "./util/Util";
import ScaleFunctions from "./util/ScaleFunctions";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    const timestepMillis = 20;
    const config = new TronConfig();
    //const config = new RainbowRoadConfig();
    config.init();
    const compiled = new EffectCompiler(config).compile();
    const effectActivator = new EffectActivator(compiled, [config], timestepMillis);
    const msgHandler = new MidiMessageHandler(effectActivator);
    const midi = new Midi(msgHandler.handleMessage.bind(msgHandler));
    console.log(midi);
    midi.openPort();

    const ledDriver = new WebsocketsDriver();
    ledDriver.connect('ws://drumlite-hub.jdl.local:3000', (data: any) => {} );

    const runner = new EffectRunner(effectActivator, ledDriver, {
        periodMillis: timestepMillis
    });

    const commandHandler = new CommandHandler(runner);
    const commandReceiver = new WebsocketServer(3003);
    commandReceiver.connect(async (msg: string) => {
        await commandHandler.handle(JSON.parse(msg) as CommandMessage);
    });
}
