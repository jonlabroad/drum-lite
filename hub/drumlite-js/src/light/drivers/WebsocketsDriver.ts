import IRemoteDriver from "./IRemoteDriver";

const Websockets = require('ws');

export default class WebsocketsDriver implements IRemoteDriver {
    ws: any;
    host: string = '';
    connected: boolean = false;

    connect(host: string, onMessage: (data: any) => void) {
        this.host = host;
        this.ws = new Websockets(this.host, {
            perMessageDeflate: false
        });

        this.ws.on('message', onMessage);
        this.ws.on('open', this.onConnection.bind(this));
        this.ws.on('close', this.onDisconnection.bind(this));
    }

    onConnection() {
        console.log(`connected ${this.host}`);
        this.connected = true;
    }

    onDisconnection() {
        console.log(`disconnected ${this.host}`);
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
