class Player:

    """
    El rol del jugador define si es "dios" o el que adivina.
    0 para dios y 1 para profeta
    """
    def __init__(self,role, cards):
        self.role = role
        self.cards = cards
        self.score = 0

    def getLenCards(self):
        return len(self.cards)

    def setScore(self, score):
        self.score = score

    def setCards(self, cards):
        self.cards = cards
        
    def getCards(self):
        return self.cards

    def getRole(self):
        return self.role
    
    def getScore(self):
        return self.score
