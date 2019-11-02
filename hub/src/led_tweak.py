import board
import neopixel
import time
import asyncio

class LedTest:
    def __init__(self):
        self.pixels = neopixel.NeoPixel(board.D18, 255, brightness=1.0, bpp=3, auto_write=False)
        self.r = 0
        self.g = 0
        self.b = 0

    def main(self):
        self.pixels.fill((0, 0, 0))
        self.pixels.show()
        
        intensity = 0
        while(True):
            command = input()
            self.runCommand(command)

            print([self.r, self.g, self.b])
            self.pixels.fill((self.r, self.g, self.b))
            self.pixels.show()
            
    def runCommand(self, cmd):
        if cmd.startswith("r"):
            if len(cmd) < 3:
                self.r = self.r + 1
            else:
                num = self.parseNum(cmd[1:])
                self.r = self.r + num
        
        if cmd.startswith("g"):
            if len(cmd) < 3:
                self.g = self.g + 1
            else :
                num = self.parseNum(cmd[1:])
                self.g = self.g + num
        
        if cmd.startswith("b"):
            if len(cmd) < 3:
                self.b = self.b + 1
            else:
                num = self.parseNum(cmd[1:])
                self.b = self.b + num

        if cmd[0].isnumeric():
            toks = cmd.split(",")
            self.r = int(toks[0])
            self.g = int(toks[1])
            self.b = int(toks[2])

    def parseNum(self, numStr):
        return int(numStr.replace('+', ''))

LedTest().main()
