import IRemoteDriver from "drumlite-js/dist/light/drivers/IRemoteDriver";

export default class WebsocketsDriver implements IRemoteDriver {
    ws: any;
    connected: boolean = false;

    connect(onOpen: any, onClose: any) {
        this.ws = new WebSocket('ws://10.0.0.27:3000');
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
