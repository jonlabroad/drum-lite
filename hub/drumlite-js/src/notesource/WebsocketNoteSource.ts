import { io, Socket } from 'socket.io-client';
import MidiDrumNote from '../midi/MidiDrumNote';

const roles = ["drumlistener"]

export class WebsocketNoteSource {
  private socket: Socket;
  private noteHandler: (note: MidiDrumNote) => void;

  constructor(serverUrl: string, noteHandler: (note: MidiDrumNote) => void) {
    this.noteHandler = noteHandler;
    this.socket = io(serverUrl, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000, // Reconnect every 1 second
      reconnectionDelayMax: 5000, // Maximum reconnection delay 5 seconds
      randomizationFactor: 0.5, // Add randomness to reconnection delays
    });

    this.socket.on('connect', this.onConnect.bind(this));
    this.socket.on('reconnect', this.onReconnect.bind(this));
    this.socket.on('disconnect', this.onDisconnect.bind(this));
    this.socket.on('error', this.onError.bind(this));
  }

  public connect() {
    console.log("Connecting...");
    this.socket.connect();
  }

  private onConnect() {
    console.log('Connected to the server');
    
    this.socket.emit("initialize", { "roles":  roles })

    // You can add more event listeners for other events if needed
    this.socket.on('drumnote', (messageString: string) => {
      const note = JSON.parse(messageString);
      const midiNote = new MidiDrumNote(note.status, note.note, note.velocity, new Date());
      this.noteHandler(midiNote);
    });
  }

  private onReconnect(attemptNumber: number) {
    console.log(`Reconnected to the server (attempt ${attemptNumber})`);
  }

  private onDisconnect(reason: string) {
    console.log(`Disconnected from the server: ${reason}`);
  }

  private onError(error: Error) {
    console.error('Socket.io Error:', error);
  }
}
