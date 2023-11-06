import socketio
import time

roles = ["drumlistener"]
noteCommand = "drumnote"

# Create a Socket.IO client
sio = socketio.Client()

# Define an event handler for the 'connect' event
@sio.event
def connect():
    print("Connected to the server")
    print("Initializing connection config")
    sio.emit("initialize", { "roles":  roles })

@sio.event
def drumnote(data):
    print(f"Note received: {data}")

# Define an event handler for the 'response' event
@sio.on('initialize')
def on_response(data):
    print(f"Initialization confirmation received: {data}")

if __name__ == '__main__':
    server_url = 'http://192.168.0.138:5000'  # Change this URL to the address of your Socket.IO server
    sio.connect(server_url, transports='websocket')

    while True:
        time.sleep(1)

    sio.disconnect()
