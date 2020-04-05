const midi = require('midi');

export default class Midi {
    public connected: boolean = false;
    midiInput: any;
    
    constructor(messageCallback: (deltaTime: number, message: number[]) => void) {
        this.midiInput = new midi.Input();
        this.midiInput.on('message', messageCallback);
    }

    public openPort(): boolean {
        const portCount = this.midiInput.getPortCount();
        console.log(`Num ports: ${portCount}`);
        for (let i = 0; i < portCount; i++) {
            console.log(`${i}: ${this.midiInput.getPortName(i)}`);
        }

        for (let i = 0; i < portCount; i++) {
            const portName: string = this.midiInput.getPortName(i);
            if (portName.includes("USB MIDI Interface")) {
                console.log(`Trying port ${i}`);
                this.midiInput.openPort(i);
                this.connected = true;
                return true;
            }
        }
        console.warn("NOT CONNECTED TO MIDI");
        return false;
    }
}