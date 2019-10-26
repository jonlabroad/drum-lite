class RGBW:
    def __init__(self, r, g, b, w=0):
        self.r = r
        self.g = g
        self.b = b
        self.w = w

    def add(self, other):
        self.r = self.r + other.r
        self.g = self.g + other.g
        self.b = self.b + other.b
        self.w = self.w + other.w

    def toString(self):
        return [self.r, self.g, self.b, self.w]