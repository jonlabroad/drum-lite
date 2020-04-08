import { CommandMessage } from "@jonlabroad/drum-lite/dist/util/CommandHandler";
import WebsocketsDriver from "../driver/WebsocketsDriver";

export default class CommandSender {
    host: string
    websocketsDriver: WebsocketsDriver
    connected: boolean
    onConnect: () => void
    onDisconnect: () => void
    
    constructor(host: string, onConnect: () => void, onDisconnect: () => void) {
        this.connected = false;
        this.host = host;
        this.websocketsDriver = new WebsocketsDriver(this.host);
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
    }

    public connect() {
        this.tryConnect();

        setInterval(() => this.tryConnect(), 20000);
    }

    public send(msg: CommandMessage) {
        this.websocketsDriver.send("message", msg);
    }

    protected onDisconnected() {
        this.connected = false;
        this.onDisconnect();
    }

    protected onConnected() {
        this.connected = true;
        this.onConnect();
    }

    protected tryConnect() {
        if (!this.connected) {
            try {
                this.websocketsDriver.connect(
                    () => this.onConnected(),
                    () => this.onDisconnected(),
                    (data: any) => console.log("RECV MESSAGE")
                );
            } catch {
                console.warn("Error trying to connect. Will try again soon");
            }
        }
    }
}