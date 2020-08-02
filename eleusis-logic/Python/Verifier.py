def verifyFirstCard(rule_info,card):
    rule_p1 = rule_info[0]
    rule_p2 = rule_info[1]
    rule_p3 = rule_info[2]

    #En esta parte se valida los patrones de colores
    if rule_p1 == "0":
        card = card[len(card)-1]
        #Verifica que la carta tiene uno de los colores permitidos
        if rule_p2 == "0":
            if rule_p3.find(card) == -1:
                #Si no encuentra la carta entre las prohibidas devuelve un True
                return True
            else:
                #Si no encuentra la carta entre las prohibidas devuelve un False
                return False

        #Verifica que la carta tenga color permitido (al ser la primera no importa en que lugar este)
        else:
            if rule_p3.find(card) == -1:
                #Verifica que este dentro de las permitidas, si no lo esta devuelve un False
                return False
            else:
                #Verifica que este dentro de las permitidas, si lo esta devuelve un True
                return True
            
    #En esta parte se valida los patrones de numeros
    else:
        if rule_p2 == "0":
            multiplos=[]
            for i in range(13):
                multiplos.append(int(rule_p3)*(i+1))
            if int(card) in multiplos:
                return True
            else:
                return False
        elif rule_p2 == "1":
            #Se verifica que el numero sea mayor al indicado
            print ("Ingresa a mayor que ", card, " la que recibe ", rule_p3," la que compara")
            if int(card) >= int(rule_p3):
                return True
            else:
                return False
        elif rule_p2 == "2":
            print ("Ingresa a menor que ", card, " la que recibe ", rule_p3," la que compara")
            #Se verifica que el numero sea menor al indicado
            if int(card) <= int(rule_p3):
                return True
            else:
                return False
        else:
            print ("Ingresa a prohibido ", card, " la que recibe ", rule_p3," la que compara")
            #El numero es el prohibido
            if card == rule_p3:
                return False
            else:
                return True

            
def verify_Card(rule_info,last_card,card):
    
    rule_p1 = rule_info[0]
    rule_p2 = rule_info[1]
    rule_p3 = rule_info[2]

    #En esta parte se valida los colores
    if rule_p1 == "0":
        card = card[len(card)-1]
        #Verifica que la carta tiene uno de los colores permitidos
        if rule_p2 == "0":
            if rule_p3.find(card) == -1:
                #Si no encuentra la carta entre las prohibidas devuelve un True
                return True
            else:
                #Si no encuentra la carta entre las prohibidas devuelve un False
                return False

        #Verifica que la carta tenga color permitido y orden correcto
        else:
            last_card = last_card[len(last_card)-1]
            pivot = last_card + card
            rule_p3 = rule_p3 + rule_p3
            if rule_p3.find(pivot) == -1:
                #Si no esta en el orden correcto devuelve False
                return False
            else:
                #Si esta en el orden correcto devuelve False
                return True
            
    #En esta parte se valida los patrones de numeros
    else:
        card = card[:len(card)-1]
        if rule_p2 == "0":
            multiplos=[]
            for i in range(13):
                multiplos.append(int(rule_p3)*(i+1))
            if int(card) in multiplos:
                return True
            else:
                return False
        elif rule_p2 == "1":
           #Se verifica que el numero sea mayor al indicado
            print ("Ingresa a mayor que ", card, " la que recibe ", rule_p3," la que compara")
            if int(card) >= int(rule_p3):
                return True
            else:
                return False
        elif rule_p2 == "2":
            print ("Ingresa a menor que ", card, " la que recibe ", rule_p3," la que compara")
            #Se verifica que el numero sea menor al indicado
            if int(card) <= int(rule_p3):
                return True
            else:
                return False
        else:
            print ("Ingresa a prohibido ", card, " la que recibe ", rule_p3," la que compara")
            #El numero es el prohibido
            if int(card) == int(rule_p3):
                #No debe ser igual al numero prohibido
                return False
            else:
                #No debe ser igual al numero prohibido
                return True
