import time
import rtmidi
import json

class MidiTest:
    def test1(self):
        midi_in = rtmidi.MidiIn()
        ports = midi_in.get_ports()

        if ports:
            midi_in.open_port(0)

        midi_in.set_callback(self.receiveCallback)

    def receiveCallback(self, msg, data):
        print(msg)
        print(data)

MidiTest().test1()

while True:
    time.sleep(1)

