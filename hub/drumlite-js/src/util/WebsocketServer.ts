const Websockets = require('ws');

export default class WebsocketServer {
    server: any;
    port: number;
    connected: boolean = false;
    socket: any;

    constructor(port: number) {
        this.port = port;
    }

    connect(onMessage: (data: any) => void) {
        this.server = new Websockets.Server({ port: this.port });

        const self = this;
        this.server.on('connection', (socket: any) => {
            console.log(`Client connection up at ${self.port}`);
            socket.on('message', onMessage);
            socket.on('open', self.onConnection.bind(self));
            socket.on('close', self.onDisconnection.bind(self));
            self.socket = socket;
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

    send(msg: any) {
        this.socket.send(msg);
    }
}
