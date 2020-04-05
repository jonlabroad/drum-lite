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
        for (let i=0; i<portCount; i++) {
            console.log(`Trying port ${this.midiInput.getPortName(i)}`);
            this.midiInput.openPort(i);
            this.connected = true;
            return true;
        }
        console.warn("NOT CONNECTED TO MIDI");
        return false;
    }
}