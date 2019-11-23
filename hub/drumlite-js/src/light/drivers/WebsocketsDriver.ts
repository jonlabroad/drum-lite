const Websockets = require('ws');

export default class WebsocketsDriver {
    ws: any;
    connected: boolean = false;

    connect() {
        //this.ws = new Websockets('ws://localhost:3000', {
            this.ws = new Websockets('ws://10.0.0.27:3000', {
            perMessageDeflate: false
        });

        this.ws.on('open', this.onConnection.bind(this));
        this.ws.on('close', this.onDisconnection.bind(this));
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
            console.log("sending");
            this.ws.send(JSON.stringify(message));
            return true;
        }
        else {
            console.log("not connected");
        }
        return false;
    }
}
