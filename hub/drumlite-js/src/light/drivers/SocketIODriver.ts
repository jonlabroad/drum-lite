import IRemoteDriver from "./IRemoteDriver";

const io = require('socket.io-client');

export default class SocketIODriver implements IRemoteDriver {
    server: any;
    public sio: any;

    constructor() {
        //this.sio = require('socket.io')('http://localhost:3000');
        this.sio = io('http://localhost:3000');
    }

    public send(type: string, message: string) {
        console.log({type, message});
        this.sio.emit(type, message);
    }
}