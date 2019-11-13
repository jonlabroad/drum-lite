import time
import rtmidi
import json
import socketio
import time
import asyncio
import signal
import sys
from aiohttp import web
import signal
import sys
import platform

from midi.midi_file_reader import MidiFileReader
from midi.midi_drum_note import MidiDrumNote
from light.effect.amplitude_effects.linear_fade_out_effect import LinearFadeOutEffect
from light.effect.translation_effects.constant_targets_effect import ConstantTargetsEffect
from light.effect.color_effects.single_color_effect import SingleColorEffect
from light.rgbw import RGBW
from light.effect.effect_combiner import EffectCombiner
from light.effect.compiled_effect import CompiledEffect
from light.effect.effect_compiler import EffectCompiler
from execute.effect_activator import EffectActivator
from execute.effect_runner import EffectRunner
from midi.hit_type import HitType
from midi.midi_listener import MidiListener

from data.testconfig.test import basicConfig
from data.testconfig.forge import forgeConfig
from data.testconfig.tron import tronConfig

#config = basicConfig()
config = tronConfig()
#config = forgeConfig()
compiled = EffectCompiler(config).compile()

eventActivator = EffectActivator(compiled)
if platform.system() != 'Windows':
    midiListener = MidiListener(eventActivator)
    midiListener.run()

#eventActivator.handleNote(HitType.SNARE_HEAD)

sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')

def signal_handler(signal, frame):
        # close the socket here
        print("EXITING")
        sys.exit(0)

@sio.event
async def connect(sid, environ):
    print("CONNECT ", sid)

@sio.event
async def disconnect(sid):
    print("DISCONNECT ", sid)

@sio.on('trigger_note')
async def noteHandler(junk, data):
    print(data)
    t = time.time()
    jsonData = json.loads(data)
    print(jsonData)
    note = MidiDrumNote(16, jsonData['note'], jsonData['velocity'], 0, t)
    eventActivator.handleNote(note.note)

def testHandler(sid, msg):
    print("TEST EVENT")
    print(msg)

async def runEffects():
    runner = EffectRunner(eventActivator, sio)
    await runner.run()

def testAsyncServer():
    app = web.Application()
    sio.on("test", testHandler)
    sio.attach(app)
    sio.start_background_task(runEffects)
    web.run_app(app, port=3000, host="localhost")
    sio.wait()

signal.signal(signal.SIGINT, signal_handler)
testAsyncServer()
