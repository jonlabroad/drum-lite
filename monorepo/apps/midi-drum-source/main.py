import socketio
import time
import json
from midi.midi_drum_note import MidiDrumNote
from midi.hit_type import HitType
from midi.midi_listener import MidiListener
from rtmidi.midiutil import open_midiinput

roles = ["drumsource"]
noteCommand = "drumnote"

# Create a Socket.IO client
sio = socketio.Client()

def connectToServer():
  try:
    sio.connect(server_url, transports='websocket')
  except:
    print("Error connecting to server")

# Define an event handler for the 'connect' event
@sio.event
def connect():
    print("Connected to the server")
    print("Initializing connection config")
    sio.emit("initialize", { "roles":  roles })

@sio.event
def disconnect():
    print("Disconnected from the server")

# Define an event handler for the 'response' event
@sio.on('initialize')
def on_response(data):
    print(f"Initialization confirmation received: {data}")

def handleMidiNote(note):
  print(f"Note received from midi: {note}")


if __name__ == '__main__':
    server_url = 'http://localhost:5000'  # Change this URL to the address of your Socket.IO server
    connectToServer()

    midiListener = MidiListener(handleMidiNote)

    while midiListener.port is None:
      midiListener.open()
      time.sleep(3)

    t = 0
    while True:
        sio.sleep(1)
        midiListener.open()
        note = MidiDrumNote(1, HitType.KICK, 255, 0, time=t)
        if sio.sid is not None:
          try:
            sio.emit(noteCommand, json.dumps({ "note": note.to_dict() }))
          except:
            print("Error sending note")
        else:
          connectToServer()

        t = t + 1

    sio.disconnect()
