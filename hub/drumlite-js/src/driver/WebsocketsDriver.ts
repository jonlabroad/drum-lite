import IRemoteDriver from "./IRemoteDriver";

const Websockets = require("ws");

export default class WebsocketsDriver implements IRemoteDriver {
  ws: any;
  host: string = "";
  connected: boolean = false;
  reconnectInterval: any;

  onMessage: (data: any) => void = () => {};
  onConnect?: () => void = () => {};

  constructor(host: string) {
    this.host = host;
  }

  connect(onMessage: (data: any) => void, onConnect?: () => void) {
    this.onMessage = onMessage;
    this.onConnect = onConnect;
    try {
      this.ws = new Websockets(this.host, {
        perMessageDeflate: false,
      });

      this.ws.on("message", onMessage);
      this.ws.on("open", this.onConnection.bind(this));
      this.ws.on("close", this.onDisconnection.bind(this));
      this.ws.on("error", this.onError.bind(this));
    } catch (e: any) {
      console.log(`Could not connect to LED driver: ${e?.message}`);
      this.createReconnectInterval();
    }
  }

  onConnection() {
    console.log(`connected ${this.host}`);
    this.connected = true;
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }
    if (this.onConnect) {
      this.onConnect();
    }
  }

  onDisconnection() {
    console.log(`disconnected ${this.host}`);
    this.connected = false;
    this.createReconnectInterval();
  }

  onError(error: any) {
    console.log(`error ${this.host}: ${error}`);
    this.connected = false;
    this.createReconnectInterval();
  }

  send(topic: string, message: Record<number, number>): boolean {
    if (this.connected) {
      this.ws.send(JSON.stringify(message));
      return true;
    }
    return false;
  }

  createReconnectInterval() {
    if (!this.reconnectInterval) {
      const self = this;
      this.reconnectInterval = setInterval(() => {
        if (!self.connected) {
            self.connect(self.onMessage, self.onConnect);
        }
      }, 3000);
    }
  }
}
