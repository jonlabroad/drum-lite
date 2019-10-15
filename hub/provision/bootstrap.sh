#!/bin/bash

apt-get update

apt-get install -y git
apt-get install -y python3
apt-get install -y python3-pip
apt-get install -y libasound2-dev
apt-get install -y libjack-dev

curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs

# MIDI
pip3 install python-rtmidi
pip3 install RPI.GPIO
pip3 install adafruit-blinka
