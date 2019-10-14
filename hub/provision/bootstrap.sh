#!/bin/bash

apt-get update

apt-get install -y git
apt-get install -y python3
apt-get install -y python3-pip

# MIDI
pip3 install python-rtmidi
