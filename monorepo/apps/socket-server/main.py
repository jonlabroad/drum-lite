import eventlet
import socketio

drumSourceRole = "drumsource"
drumListenerRole = "drumlistener"
validRoles = [drumSourceRole, drumListenerRole]

# Create a Socket.IO server
sio = socketio.Server(cors_allowed_origins="*")

# Wrap the Socket.IO server with an eventlet web server
app = socketio.WSGIApp(sio)

# Define a function to handle the 'connect' event
@sio.event
def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
def initialize(sid, data):
    print(f"Initializing connection config for {sid}")
    responses = []
    for role in data['roles']:
      if (role in validRoles):
        print(f"Adding {sid} to room {role}")
        sio.enter_room(sid, role)
      else:
        responses.append(f"Invalid role: {role}")

    if (len(responses) > 0):
      sio.emit('initialize', responses, room=sid)
    else:
      sio.emit('initialize', "OK", room=sid)

@sio.event
def drumnote(sid, data):
    print(f"Drum note received from {sid}: {data}")
    sio.emit("drumnote", data, room=drumListenerRole)

# Define a function to handle the 'message' event
@sio.event
def message(sid, data):
    print(f"Message from {sid}: {data}")
    sio.emit('response', connections[sid], room=sid)

# Define a function to handle the 'disconnect' event
@sio.event
def disconnect(sid):
    print(f"Client disconnected: {sid}")

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
