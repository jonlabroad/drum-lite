import { CommandMessage } from "@jonlabroad/drum-lite/dist/util/CommandHandler";
import WebsocketsDriver from "../driver/WebsocketsDriver";

export default class CommandSender {
    host: string
    websocketsDriver: WebsocketsDriver
    onConnect: () => void
    onDisconnect: () => void
    
    constructor(host: string, onConnect: () => void, onDisconnect: () => void) {
        this.host = host;
        this.websocketsDriver = new WebsocketsDriver(this.host);
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
    }

    public connect() {
        this.websocketsDriver.connect(
            this.onConnect,
            this.onDisconnect,
            (data: any) => console.log("RECV MESSAGE")
        );
    }

    public send(msg: CommandMessage) {
        this.websocketsDriver.send("message", msg);
    }
}