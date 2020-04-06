import IRemoteDriver from "@jonlabroad/drum-lite/dist/light/drivers/IRemoteDriver";

export default class WebsocketsDriver implements IRemoteDriver {
    ws: any;
    host: string;
    connected: boolean = false;

    constructor(host: string) {
        this.host = host;
    }

    connect(onOpen: any, onClose: any, onMessage: (data: any) => void) {
        this.ws = new WebSocket(this.host);
        this.ws.onopen = () => {
            this.connected = true;
            onOpen();
        }

        this.ws.onclose = () => {
            this.connected = false;
            onClose();
        }
    }

    onConnection() {
        console.log('connected');
        this.connected = true;
    }

    onDisconnection() {
        console.log('disconnected');
        this.connected = false;
    }

    send(topic: string, message: any): boolean {
        if (this.connected) {
            this.ws.send(JSON.stringify(message));
            return true;
        }
        else {
            console.log("not connected");
        }
        return false;
    }
}
