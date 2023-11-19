import WebsocketsDriver from "./driver/WebsocketsDriver";
import EffectRunner from "./effect/EffectRunner";
import EffectActivator from "./effect/EffectActivator";
import Tron from "./library/config/Tron";
import CommandHandler, { CommandMessage } from "./util/CommandHandler";
import WebsocketServer from "./util/WebsocketServer";
//import LocalBlinkStickDriver from "./driver/LocalBlinkstickDriver";
import { WebsocketNoteSource } from "./notesource/WebsocketNoteSource";
import { ServiceConfig } from "./config/ServiceConfig";
import DebugDriver from "./driver/DebugDriver";
import { NullDriver } from "./driver/NullDriver";
import { SocketIoDriver } from "./driver/SocketIoDriver";

async function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

export default async function main() {
    const timestepMillis = 50;
    const config = new Tron();
    const configEffects = config.getEffects();

    const activator = new EffectActivator();

    const serverUrl = ServiceConfig.drumSocketServer;
    const noteSource = new WebsocketNoteSource(serverUrl, (note) => {
        console.log({note});
        activator.handleNote(note)
    });
    noteSource.connect();

    const ledDriver = new SocketIoDriver(ServiceConfig.ledDriverServer);
    ledDriver.connect();

    const effectRunner = new EffectRunner(activator, ledDriver, {
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
