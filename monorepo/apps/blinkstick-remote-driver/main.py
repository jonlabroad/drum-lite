import time
import socketio
import json
import eventlet
from blinkstick import blinkstick


#for bstick in blinkstick.find_all():
#  bstick.set_random_color()
  
# Create a Socket.IO server
sio = socketio.Server(cors_allowed_origins="*")

# Wrap the Socket.IO server with an eventlet web server
app = socketio.WSGIApp(sio)

# Define a function to handle the 'connect' event
@sio.event
def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
def led(sid, data):
    print(f"LED command received from {sid}: {data}")

# Define a function to handle the 'disconnect' event
@sio.event
def disconnect(sid):
    print(f"Client disconnected: {sid}")

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
