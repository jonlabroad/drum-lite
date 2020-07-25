const Websockets = require('ws');

export default class WebsocketServer {
    server: any;
    port: number;
    connected: boolean = false;

    constructor(port: number) {
        this.port = port;
    }

    connect(onMessage: (data: any) => void) {
        this.server = new Websockets.Server({ port: this.port });

        this.server.on('connection', (socket: any) => {
            console.log(`Client connection up at ${this.port}`);
            socket.on('message', onMessage);
            socket.on('open', this.onConnection.bind(this));
            socket.on('close', this.onDisconnection.bind(this));
        })
    }

    onConnection() {
        console.log(`connected ${this.port}`);
        this.connected = true;
    }

    onDisconnection() {
        console.log(`disconnected ${this.port}`);
        this.connected = false;
    }
}
