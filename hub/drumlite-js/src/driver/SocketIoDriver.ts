import { Socket, io } from "socket.io-client";
import IRemoteDriver from "./IRemoteDriver";

export class SocketIoDriver implements IRemoteDriver {
    private host: string;
    private socket: Socket<any, any> | undefined = undefined;

    constructor(host: string) {
        this.host = host;
    }

    public async connect() {
        this.socket = io(this.host);

        // Handle the 'connect' event
        this.socket.on('connect', () => {
            console.log('Connected to LED driver server');
        });
        
        // Handle the 'disconnect' event
        this.socket.on('disconnect', () => {
            console.log('Disconnected from LED driver server');
        });
        
        // Reconnect automatically
        this.socket.on('reconnect', (attemptNumber: number) => {
            console.log(`Reconnected to LED driver server after ${attemptNumber} attempts`);
        });
    }

    send(topic: string, message: Record<number, number[]>) {
        this.socket?.emit(topic, message);
    }

}