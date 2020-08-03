def generate_deck():
    all_Cards = []
    #Y = yellow
    #R = Red
    #G = Green
    #B = Blue
    for i in range (2):
        for deck in ["Y", "R", "G", "B"]:
            for num in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                "11", "12", "13"]:
                all_Cards.append(num + deck)
    return all_Cards


def generate_random_card():
    values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
    num = ["Y", "R", "G", "B"]
    card = values[random.randint(0, len(values) - 1)] + num[random.randint(0, len(suits) - 1)]

    return card

