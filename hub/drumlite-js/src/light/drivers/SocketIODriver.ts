const io = require('socket.io-client');

export default class SocketIODriver {
    server: any;
    public sio: any;

    constructor() {
        //this.sio = require('socket.io')('http://localhost:3000');
        this.sio = io('http://localhost:3000');
    }

    public send(type: string, message: any) {
        console.log({type, message});
        this.sio.emit(type, message);
    }
}