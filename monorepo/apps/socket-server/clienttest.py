import socketio

# Create a Socket.IO client
sio = socketio.Client()

# Define an event handler for the 'connect' event
@sio.event
def connect():
    print("Connected to the server")
    print("Initializing connection config")
    sio.emit("initialize", { "roles":  ["drumsource"] })

# Define an event handler for the 'response' event
@sio.on('initialize')
def on_response(data):
    print(f"Initialization confirmation received: {data}")

if __name__ == '__main__':
    server_url = 'http://localhost:5000'  # Change this URL to the address of your Socket.IO server
    sio.connect(server_url, transports='websocket')

    while True:
        message = input("Enter a message (or 'exit' to quit): ")
        if message == 'exit':
            break
        sio.emit('message', message)

    sio.disconnect()
