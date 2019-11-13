#!/bin/bash

apt-get update

apt-get install -y git
apt-get install -y python3
apt-get install -y python3-pip
apt-get install -y libasound2-dev
apt-get install -y libjack-dev

curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs

# Neopixel
pip3 install adafruit-circuitpython-lis3dh
pip3 install adafruit-circuitpython-neopixel
pip3 install python-socketio

# MIDI
pip3 install python-rtmidi

