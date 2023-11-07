import WebsocketsDriver from "./driver/WebsocketsDriver";
import EffectRunner from "./effect/EffectRunner";
import EffectActivator from "./effect/EffectActivator";
import Tron from "./library/config/Tron";
import CommandHandler, { CommandMessage } from "./util/CommandHandler";
import WebsocketServer from "./util/WebsocketServer";
import LocalBlinkStickDriver from "./driver/LocalBlinkstickDriver";
import { WebsocketNoteSource } from "./notesource/WebsocketNoteSource";

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

    const serverUrl = 'ws://192.168.0.138:5000';
    const noteSource = new WebsocketNoteSource(serverUrl, (note) => activator.handleNote(note));
    noteSource.connect();

    const blinkstickDriver = new LocalBlinkStickDriver();
    blinkstickDriver.connect();
    const effectRunner = new EffectRunner(activator, blinkstickDriver, {
        periodMillis: timestepMillis
    });
    activator.addAmbientEffects(configEffects.ambient);
    activator.addTriggeredEffects(configEffects.triggered);
    activator.addModifiers(configEffects.modifiers);

    const commandHandler = new CommandHandler(effectRunner);
    const commandReceiver = new WebsocketServer(3003);
    commandReceiver.connect(async (msg: string) => {
        await commandHandler.handle(JSON.parse(msg) as CommandMessage);
    });

    await effectRunner.run();
}
