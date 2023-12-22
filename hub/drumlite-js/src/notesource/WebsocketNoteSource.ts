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
    console.log("Connecting to the note source server...");
    this.socket.connect();
  }

  private onConnect() {
    console.log('Connected to the note source server');
    
    this.socket.emit("initialize", { "roles":  roles })

    // You can add more event listeners for other events if needed
    this.socket.on('drumnote', (note: string) => {
      console.log({ note });
      const parsedNote = JSON.parse(note) as any;
      const midiNote = new MidiDrumNote(parsedNote.status, parsedNote.note, parsedNote.velocity, new Date());
      this.noteHandler(midiNote);
    });
  }

  private onReconnect(attemptNumber: number) {
    console.log(`Reconnected to the note source server (attempt ${attemptNumber})`);
  }

  private onDisconnect(reason: string) {
    console.log(`Disconnected from the note source server: ${reason}`);
  }

  private onError(error: Error) {
    console.error('Socket.io Error:', error);
  }
}
