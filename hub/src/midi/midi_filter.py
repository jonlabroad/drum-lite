import time

class MidiFilter:
    noteHistoryLength = 1.0
    doubleHitThreshold = 0.1

    def __init__(self):
        self.recentNotes = []

    def filterNote(self, note):
        self.cleanHistory()
        print(len(self.recentNotes))
        note = self.filterOutDoubleHits(note)
        if note:
            self.recentNotes.append(note)

        return note

    def cleanHistory(self):
        t = time.time()
        self.recentNotes = list(filter(lambda n: t - n.time < self.noteHistoryLength, self.recentNotes))

    def filterOutDoubleHits(self, note):
        if not note:
            return None

        t = time.time()
        duplicates = list(filter(lambda n: note.note == n.note and t - n.time < MidiFilter.doubleHitThreshold, self.recentNotes))
        if len(duplicates) > 0:
            return None
        return note

