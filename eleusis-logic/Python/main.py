import random
import Deck
from Player import Player
import Verifier

def main():
    #Se genera el deck
    prophets_number=2
    prophet_turn=1
    deck = Deck.generate_deck()
    board = []
    no_world = []
    
    #Se reparten 5 cartas a cada jugador

    #Primer jugador
    deck_player = []
    for i in range (12):
       index = random.randint(0,len(deck)-1)
       deck_player.append(deck[index])
       deck.pop(index)
    player1 = Player(1,deck_player)

    #Segundo jugador
    deck_player = []
    for i in range (12):
       index = random.randint(0,len(deck)-1)
       deck_player.append(deck[index])
       deck.pop(index)
    player2 = Player(1,deck_player)

    #Se declara al tercer jugador como "dios"
    player3 = Player(0,None)
    rule=[]
    guessed_rule=[]
    answer = input("Desea poner una regla de colores 1. si 2. no\n")
    if (answer == 1):

        rule.append("0")
        
        answer = input("Elija una de reglas existentes con colores: \n"
              +"1. Los colores que elija no estaran permitidos\n"
              +"2. Un orden de color que usted desea\n")
        
        if (answer==1):
            color_rule = raw_input("Ingrese hasta tres colores que desee prohibir\nY= yellow\nR= red\nB= blue\nG= green\n")
            rule.append("0")
            rule.append(color_rule.upper())
        else:
            color_rule = raw_input("Ingrese el orden que desee (si no usa todos los colores, no estaran permitidos)\nY= yellow\nR= red\nB= blue\nG= green\n")
            rule.append("1")
            rule.append(color_rule.upper())

    else:
        rule.append(1)
        answer = input("Elija una de reglas existentes con numeros: \n1. multiplos del numero que usted elija\n2. mayor al numero que usted elija\n3. menor al numero que usted desee\n4. prohibir un numero\n")
        if (answer==1):
            number_rule = input("Ingrese el numero que desee menor o igual a 13: ")
            rule.append("0")
            rule.append(number_rule)
        elif (answer == 2):
            number_rule = input("Ingrese el numero que desee menor o igual a 13: ")
            rule.append("1")
            rule.append(number_rule)
        elif (answer ==3):
            number_rule = input("Ingrese el numero que desee menor o igual a 13:")
            rule.append("2")
            rule.append(number_rule)
        else:
            number_rule = input("Ingrese el numero que desea prohibir")
            rule.append("3")
            rule.append(number_rule)

    #Se empieza el juego
    print ("\n\n----------------------------------------------------------------------------------------")
    print ("                                 INICIA EL JUEGO")
    print ("----------------------------------------------------------------------------------------\n\n")

    #Se coloca la primera carta en el tablero
    first_card_validity = False
    while not(first_card_validity):
        if rule[0] == "0":
            index = random.randint(0,len(deck)-1)
            card = deck[index]
            card_letter = card[len(card)-1]
            first_card_validity = Verifier.verifyFirstCard(rule,card_letter)
        else:
            index = random.randint(0,len(deck)-1)
            card = deck[index]
            card_number = card[:len(card)-1]
            first_card_validity = Verifier.verifyFirstCard(rule,card_number)
            
    deck.pop(index)
    board.append(card)
    print ("La primera carta es : " + card)
    
    print("\n                                JUGADOR 1, TU TURNO")

    #Entra en un ciclo, hasta que uno de los jugadores terminen sus cartas o descubran la regla seguiran jugando
    rule_discovered = False
    while (player1.getLenCards() > 0) and (player2.getLenCards() > 0) and not(rule_discovered):

        if prophet_turn == 1:
            cards_player = player1.getCards()
            print ("Sus cartas son: ", cards_player)
            answer = input("\nDesea...\n1. Colocar una carta \n2. Decir que no tiene carta para poner\n")
            if (answer == 1):
                valid_card = False
                while not(valid_card):
                    answer = raw_input("Escriba su carta")
                    letter_answer = answer[len(answer)-1]
                    number_answer = answer[:len(answer)-1]
                    letter_answer = letter_answer.upper()
                    answer= number_answer + letter_answer
                    if answer not in (cards_player):
                        print ("elija una de sus cartas")
                        print (cards_player)
                    else:
                        i=0
                        for x in cards_player:
                            if x == answer:
                                break
                            i=i+1
                        valid_card=not(valid_card)

        if (Verifier.verify_Card(rule,board[len(board)-1],cards_player[i])):
            print ("Correcto")
            board.append(cards_player[i])
            cards_player.pop(i)
            player1.setCards(cards_player)
            answer 
        else:
            no_world.append((board[len(board)-1]," y ",cards_player[i]," no siguen la regla\n "))
            cards_player.pop(i)
            cards_player.append(deck[random.randint(0,len(deck)-1)])
            player1.setCards(cards_player)
            print("No puedes jugar esa carta, se va al no mundo")

        prophet_turn2 = 2

        print("")
        print ("El tablero esta de esta forma: ", board)
        print ("El no mundo es el siguiente: ", no_world)
        print("")
        print("                                JUGADOR 2, TU TURNO")

        if prophet_turn2 == 2:
            cards_player = player2.getCards()
            print ("Sus cartas son: ", cards_player)
            answer = input("\nDesea...\n1. Colocar una carta \n2. Decir que no tiene carta para poner\n")
            if (answer == 1):
                valid_card = False
                while not(valid_card):
                    answer = raw_input("Escriba su carta")
                    letter_answer = answer[len(answer)-1]
                    number_answer = answer[:len(answer)-1]
                    letter_answer = letter_answer.upper()
                    answer= number_answer + letter_answer
                    if answer not in (cards_player):
                        print ("elija una de sus cartas")
                        print (cards_player)
                    else:
                        i=0
                        for x in cards_player:
                            if x == answer:
                                break
                            i=i+1
                        valid_card=not(valid_card)

        #Verifica si la carta que selecciono el jugador es correcta           
        if (Verifier.verify_Card(rule,board[len(board)-1],cards_player[i])):
            print ("Correcto")
            board.append(cards_player[i])
            cards_player.pop(i)
            player2.setCards(cards_player)
        else:
            no_world.append((board[len(board)-1]," y ",cards_player[i]," no siguen la regla\n "))
            cards_player.pop(i)
            cards_player.append(deck[random.randint(0,len(deck)-1)])
            player2.setCards(cards_player)
            print("No puedes jugar esa carta, se va al no mundo")
            

        print("")
        print ("El tablero esta de esta forma: ", board)
        print ("El no mundo es el siguiente: ", no_world)
        print("")
        print("                                JUGADOR 1, TU TURNO")

        prophet_turn2 = 1 
            
        
if __name__ == '__main__':
    main()
    
