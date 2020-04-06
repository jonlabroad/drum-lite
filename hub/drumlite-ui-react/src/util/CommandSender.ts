import { CommandMessage } from "@jonlabroad/drum-lite/dist/util/CommandHandler";
import WebsocketsDriver from "../driver/WebsocketsDriver";

export default class CommandSender {
    host: string
    websocketsDriver: WebsocketsDriver
    
    constructor(host: string) {
        this.host = host;
        this.websocketsDriver = new WebsocketsDriver(this.host);
    }

    public connect() {
        this.websocketsDriver.connect(
            () => console.log(`Connected to ${this.host}`),
            () => console.log(`Disconnected from ${this.host}`),
            (data: any) => console.log("RECV MESSAGE")
        );
    }

    public send(msg: CommandMessage) {
        this.websocketsDriver.send("message", msg);
    }
}