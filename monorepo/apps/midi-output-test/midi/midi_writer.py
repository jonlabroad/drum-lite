import rtmidi

class MidiWriter:
    def __init__(self):
        self.connected = False
        self.port = None
        self.portNum = None
        self.midi_out = rtmidi.MidiOut()

    def run(self):
        self.open()

    def write(self):
      message = [0x90, 60, 64]
      if self.port is not None:
        print(f"Sending message: {message}")
        self.midi_out.send_message(message)

    def open(self):
        if not self.isPortOpen():
            portInfo = self.findPortToOpen()
            if portInfo is not None:
                self.midi_out.open_port(portInfo["portNum"])
                self.port = portInfo["port"]
                self.portNum = portInfo["portNum"]

    def isPortOpen(self):
        portInfo = self.findPortToOpen()
        if portInfo is None:
            self.midi_out.close_port()
            self.port = None
            self.portNum = None
            return False

        if (self.port is not None):
            isOpen = rtmidi.MidiOut.is_port_open(self.port)
            print(f"isOpen: {isOpen}")
            return isOpen
        print("isOpen: False")
        return False

    def findPortToOpen(self):
        ports = self.midi_out.get_ports()
        if ports:
            portNum = 0
            print(ports)
            for port in ports:
                if "USB MIDI Interface" in port:
                    return { "portNum": portNum, "port": port }
                portNum = portNum + 1
