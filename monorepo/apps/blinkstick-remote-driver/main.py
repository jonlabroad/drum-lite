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

blinkstickDef = blinkstick.BlinkStickPro(r_led_count=32, max_rgb_value=128, delay=0.001)
blinkstickDef.connect()
bstick = blinkstickDef.bstick

# Define a function to handle the 'connect' event
@sio.event
def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
def command_leds(sid, data):
    command = json.loads(data)
    for ledNum in command.keys():
        ledNumInt = int(ledNum)
        if (ledNumInt <= 31):
            bstick.set_color(0, ledNumInt, command[ledNum][0], command[ledNum][1], command[ledNum][2])
    time.sleep(0.020)           

# Define a function to handle the 'disconnect' event
@sio.event
def disconnect(sid):
    print(f"Client disconnected: {sid}")

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5001)), app)
