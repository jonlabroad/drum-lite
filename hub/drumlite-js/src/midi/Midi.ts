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
        for (let i=0; i<portCount; i++) {
            this.midiInput.openPort(i);
            this.connected = true;
            return true;
        }
        return false;
    }
}