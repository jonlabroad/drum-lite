import IRemoteDriver from "./IRemoteDriver";
const blinkstick = require('blinkstick');

export default class LocalBlinkStickDriver implements IRemoteDriver {
    devices: any[] = [];

    public connect() {
        const firstDevice = blinkstick.findFirst();
        this.devices.push(firstDevice);
        console.log({ firstDevice });
    }

    send(topic: string, message: Record<string, number[]>): boolean {
        Object.entries(message).forEach((kvp, index) => {
            const ledIndex = kvp[0];
            const value = kvp[1];
            const device = this.devices[0];
            const ledIndexNum = parseInt(ledIndex);
            if (ledIndexNum < 32) {
                try {
                    device.setColor(value[0], value[1], value[2], { channel: 0, index: ledIndexNum });
                } catch (e) {
                    console.error({ e });
                }
            }
        });
        return true;
    }
}
