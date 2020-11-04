import WebsocketsDriver from "./driver/WebsocketsDriver";
import EffectRunner from "./effect/EffectRunner";
import EffectActivator from "./effect/EffectActivator";
import Midi from "./midi/Midi";
import MidiDrumNote from "./midi/MidiDrumNote";
import Tron from "./library/config/Tron";
import CommandHandler, { CommandMessage } from "./util/CommandHandler";
import WebsocketServer from "./util/WebsocketServer";

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

    const websocket = new WebsocketServer(4000);
    websocket.connect(() => {});

    const midi = new Midi((dt, msg) => {
        console.log(msg);
        const note = MidiDrumNote.fromRawNote(msg, new Date());
        activator.handleNote(note);
        websocket.send("TEST$1190800$135240");
    });
    midi.openPort();
/*
    const websocketsDriver = new WebsocketsDriver();
    websocketsDriver.connect(
        "ws://drumlite-hub.jdl.local:3000",
        (data: any) => {}
    );
    const effectRunner = new EffectRunner(activator, websocketsDriver, {
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
    */
}
