#import time
#import rtmidi
#import json
#import time
#import asyncio
#import signal
#import sys

#import signal
#import sys
#import platform

# sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')

# def signal_handler(signal, frame):
#         # close the socket here
#         print("EXITING")
#         sys.exit(0)

# @sio.event
# async def connect(sid, environ):
#     print("CONNECT ", sid)

# @sio.event
# async def disconnect(sid):
#     print("DISCONNECT ", sid)

# @sio.on('command_leds')
# async def command_leds(junk, data):
#     print("msg")
#     #jsonData = json.loads(data)
#     #print(jsonData)
#     #note = MidiDrumNote(16, jsonData['note'], jsonData['velocity'], 0, t)
#     #eventActivator.handleNote(note.note)

# @sio.on('test')
# async def test(junk, data):
#     #print([data])
#     print("DATA")

# def testAsyncServer():
#     app = web.Application()
#     sio.attach(app)
#     web.run_app(app, port=3000)
#     sio.wait()

# signal.signal(signal.SIGINT, signal_handler)
# testAsyncServer()

import socketio
import eventlet
#from aiohttp import web

sio = socketio.Server()
app = socketio.WSGIApp(sio)
#sio.attach(app)

@sio.event
def connect(sid, environ):
    print('connected ' + sid)

@sio.event
def disconnect(sid):
    print('disconnected ' + sid)

@sio.on('test')
async def test(sid, message):
    print(message)

eventlet.wsgi.server(eventlet.listen(('', 3000)), app)

#web.run_app(app, host="localhost", port=3000)
#web.run_app(app, host="localhost", port=3000)
