//Clase de Jugador
var Player = /** @class */ (function () {
    function Player(id) {
        this.cards_owned = [];
        this.role = null;
        this.cards_owned = null;
        this.score = 0;
        this.id = id;
    }
    /*
    Functions:
        sets
        gets
        lenCards
    */
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.getId = function () {
        return this.id;
    };
    Player.prototype.getRole = function () {
        return this.role;
    };
    Player.prototype.getCards = function () {
        return this.cards_owned;
    };
    Player.prototype.setScore = function (score) {
        this.score = score;
    };
    Player.prototype.setRole = function (role) {
        this.role = role;
    };
    Player.prototype.setCards = function (cards) {
        this.cards_owned = cards;
    };
    Player.prototype.getLenCards = function () {
        return this.cards_owned.length;
    };
    Player.prototype.toString = function () {
        return "El rol del jugador es " + this.role + " y su puntaje es " + this.score + ".\nSus cartas son: " + this.cards_owned;
    };
    return Player;
}());
//Clase de carta
var Card = /** @class */ (function () {
    function Card(value, symbol) {
        this.symbol = symbol;
        if (Number(value) >= 11) {
            if (Number(value) == 11) {
                this.character = "J";
            }
            else if (Number(value) == 12) {
                this.character = "Q";
            }
            else if (Number(value) == 13) {
                this.character = "K";
            }
        }
        else {
            this.character = value;
        }
        this.value = Number(value);
        this.isValid = false;
    }
    Card.prototype.getValue = function () {
        return this.value;
    };
    Card.prototype.getSymbol = function () {
        return this.symbol;
    };
    Card.prototype.setIsValid = function (isValid) {
        this.isValid = isValid;
    };
    Card.prototype.toString = function () {
        return this.character + this.symbol;
    };
    Card.prototype.valueAndSymbol = function () {
        return this.value + this.symbol;
    };
    return Card;
}());
//Función para crear un deck de cartas nuevo
function generate_deck() {
    var all_Cards = new Array();
    /*
    Spade = S
    Heart = H
    Club = C
    Diamonds = D
    */
    var symbol = new Array("S", "H", "C", "D");
    var numbers = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13");
    for (var i = 0; i < 2; i++) {
        for (var j in symbol) {
            for (var k in numbers) {
                var new_card = new Card(numbers[k], symbol[j]);
                all_Cards.push(new_card);
            }
        }
    }
    return all_Cards;
}
//Funcion para verificar la primera carta
function verify_First(rule_info, card) {
    var rule_p1 = rule_info[0];
    var rule_p2 = rule_info[1];
    var rule_p3 = rule_info[2];
    if (rule_p1 == 0) {
        //card = card[len(card)-1]
        //Verifica que la carta tiene uno de los colores permitidos
        if (rule_p2 == 0) {
            if (rule_p3.includes(card)) {
                return false;
            }
            else {
                return true;
            }
        }
        //verifica que la carta tenga color permitido (al ser la primera no importa en que lugar este)
        else if (rule_p2 == 1) {
            if (rule_p3.includes(card)) {
                //Verifica que este dentro de las permitidas, si no lo esta devuelve un False
                return true;
            }
            else {
                //Verifica que este dentro de las permitidas, si lo esta devuelve un True
                return false;
            }
        }
    }
    else {
        if (rule_p2 == 0) {
            //Se verifica que sea multiplo
            var resultado = card % rule_p3;
            if (resultado == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (rule_p2 == 1) {
            //Se verifica que el numero sea mayor al indicado
            if (Number(card) >= Number(rule_p3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (rule_p2 == 2) {
            //Se verifica que el numero sea menor al indicado
            if (Number(card) <= Number(rule_p3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            //El numero es el prohibido
            if (card == rule_p3) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}
// Regresa el estado de la mesa
function printEstadoJuego(deck, no_world) {
    var mensaje;
    mensaje = "El tablero esta de esta manera: ";
    for (var _i = 0, deck_1 = deck; _i < deck_1.length; _i++) {
        var element = deck_1[_i];
        mensaje = mensaje + " " + element.toString() + " ";
    }
    mensaje = mensaje + "\nLas combinaciones incorrectas han sido: \n";
    if (!(no_world.length == 0)) {
        for (var _a = 0, no_world_1 = no_world; _a < no_world_1.length; _a++) {
            var element = no_world_1[_a];
            mensaje = mensaje + element;
        }
    }
    else {
        mensaje = mensaje + "Aun no han habido errores";
    }
    return mensaje;
}
//Verifica que la carta que el jugador ingrese, este correcta
function verify_Card(rule_info, last_card, card) {
    //Se analiza la regla
    var rule_p1 = rule_info[0];
    var rule_p2 = rule_info[1];
    var rule_p3 = rule_info[2];
    if (rule_p1 == 0) {
        //Se toma el último caracter de la carta para saber que tipo es 
        card = card.charAt(card.length - 1);
        prompt(card);
        //Verifica que la carta no tenga uno de los colores prohibidos
        if (rule_p2 == 0) {
            if (rule_p3.includes(card)) {
                return false;
            }
            else {
                return true;
            }
        }
        //Verifica que la carta tenga color permitido y orden correcto
        else {
            last_card = last_card.charAt(last_card.length - 1);
            var pivot = last_card + card;
            var pivotRule = rule_p3 + rule_p3;
            if (pivotRule.includes(pivot)) {
                //Si esta en el orden correcto devuelve true
                return true;
            }
            else {
                //Si no esta en el orden correcto devuelve False
                return false;
            }
        }
    }
    else {
        //Se toma el número de la carta
        card = card.slice(0, card.length - 1);
        card = Number(card);
        prompt(card);
        if (rule_p2 == 0) {
            //Se verifica que sea multiplo
            var resultado = card % rule_p3;
            if (resultado == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (rule_p2 == 1) {
            //Se verifica que el numero sea mayor al indicado
            if (Number(card) >= Number(rule_p3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (rule_p2 == 2) {
            //Se verifica que el numero sea menor al indicado
            if (Number(card) <= Number(rule_p3)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            //El numero es el prohibido
            if (card == rule_p3) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}
//Verifica que la regla que adivinaron sea la correcta
function verify_rule_guessed(rule_info, guessed_rule) {
    if ((Number(rule_info[0]) + 1 == guessed_rule[0]) && (Number(rule_info[1]) + 1 == guessed_rule[1])) {
        if (rule_info[2] == guessed_rule[2]) {
            return true;
        }
        else {
            var pivot = guessed_rule[2] + guessed_rule[2] + guessed_rule[2].charAt(1) + guessed_rule[2].charAt(0);
            if (pivot.includes(rule_info[2])) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
}
//Funcion para establecer la regla
function setRule() {
    var new_rule = new Array;
    //Se elige la regla
    answer = prompt("Desea poner una regla de tipo de carta 1. si 2. no\n");
    //Preguntas para las reglas de colores
    if (answer == "1") {
        new_rule.push(0);
        answer = prompt("Elija una de reglas existentes con colores: \n"
            + "1. Los tipos de carta que elija no estaran permitidos\n"
            + "2. Un orden que usted desea\n");
        if (answer == "1") {
            var color_rule = prompt("Ingrese hasta tres tipos de carta que desee prohibir\nS= Spade\nC= Club\nH= Heart\nD= Diamond\n");
            new_rule.push(0);
            new_rule.push(color_rule.toUpperCase());
        }
        else {
            var color_rule = prompt("Ingrese el orden que desee (si no usa todos los tipos, no estaran permitidos)\nS= Spade\nC= Club\nH= Heart\nD= Diamond\n");
            new_rule.push(1);
            new_rule.push(color_rule.toUpperCase());
        }
    }
    //Preguntas para las reglas de numeros
    else {
        new_rule.push(1);
        answer = prompt("Elija una de reglas existentes con numeros: \n1. multiplos del numero que usted elija\n2. mayor al numero que usted elija\n3. menor al numero que usted desee\n4. prohibir un numero\n");
        if (answer == "1") {
            var number_rule = prompt("Ingrese el numero que desee menor o igual a 13: ");
            new_rule.push(0);
            new_rule.push(number_rule);
        }
        else if (answer == "2") {
            var number_rule = prompt("Ingrese el numero que desee menor o igual a 13: ");
            new_rule.push(1);
            new_rule.push(number_rule);
        }
        else if (answer == "3") {
            var number_rule = prompt("Ingrese el numero que desee menor o igual a 13:");
            new_rule.push(2);
            new_rule.push(number_rule);
        }
        else {
            var number_rule = prompt("Ingrese el numero que desea prohibir");
            new_rule.push(3);
            new_rule.push(number_rule);
        }
    }
    return new_rule;
}
//Función para tomar el index de una carta que cumpla con la regla
function getFirstCard(rule, deck) {
    var first_card_validity = false;
    while (!(first_card_validity)) {
        if (rule[0] == 0) {
            index = Math.floor(Math.random() * (deck.length));
            var card = deck[index];
            var card_symbol = card.getSymbol();
            first_card_validity = verify_First(rule, card_symbol);
        }
        else {
            index = Math.floor(Math.random() * (deck.length));
            var card = deck[index];
            var card_number = card.getValue();
            first_card_validity = verify_First(rule, card_number);
        }
    }
    return index;
}
//Función para verificar que la regla que adivinaron es la correcta
function guess_rule(rule) {
    var guessed_rule = new Array;
    guessed_rule.push(prompt("La regla es \n1. Con tipo de cartas \n2. Numerica"));
    if (guessed_rule[0] == 1) {
        guessed_rule.push(prompt("Cual de las reglas existentes es: "
            + "\n1. Los tipos de cartas que elija no estaran permitidos\n"
            + "2. Un orden que usted desea"));
        guessed_rule.push(prompt("Elija el tipo o tipos de cartas"));
        guessed_rule[2] = guessed_rule[2].toUpperCase();
        return verify_rule_guessed(rule, guessed_rule);
    }
    if (guessed_rule[0] == 2) {
        guessed_rule.push(prompt("Cual de las reglas existentes es: "
            + "\n1. multiplos del numero que usted elija"
            + "\n2. mayor al numero que usted elija"
            + "\n3. menor al numero que usted desee"
            + "\n4. prohibir un numero\n"));
        guessed_rule.push(prompt("¿Que numero es?"));
        return verify_rule_guessed(rule, guessed_rule);
    }
}
//Función para verificar que la carta que eligio la tenga en la mano
function select_card(player_info) {
    var cards_player = player_info.getCards();
    var valid_card = false;
    while (!(valid_card)) {
        answer = prompt(printEstadoJuego(board, no_world)
            + "\nSus cartas son: " + cards_player
            + "\nEscriba su carta");
        var letter_answer = answer.charAt(answer.length - 1);
        var number_answer = answer.slice(0, answer.length - 1);
        letter_answer = letter_answer.toUpperCase();
        answer = number_answer + letter_answer;
        var index_1 = void 0;
        for (var element in cards_player) {
            if (cards_player[element].toString() == answer) {
                valid_card = true;
                index_1 = element;
            }
        }
        if (valid_card) {
            return index_1;
        }
        else {
            prompt("Elija una carta que tenga, eligio " + answer);
        }
    }
}
/*
MAIN
*/
var prohphets_number = 2;
var index;
var player_turn = 1;
var deck = new Array;
var no_world = new Array;
var players_Array = new Array;
var answer;
var rule_discovered = false;
var cards_in_hand = true;
var rule = new Array;
var rounds = 0;
var first_card_index;
//Se crean los jugadores
for (var i = 0; i < prohphets_number + 1; i++) {
    var new_Player = new Player(i + 1);
    players_Array.push(new_Player);
}
//Se inicia el juego por rondas
while (rounds <= prohphets_number) {
    //Se establecen los roles
    for (var i = 0; i < prohphets_number + 1; i++) {
        if (rounds == 0) {
            if (i == prohphets_number) {
                players_Array[i].setRole("god");
            }
            else {
                players_Array[i].setRole("prophet");
            }
        }
        else {
            players_Array[i].setRole("prophet");
            if (i == prohphets_number) {
                players_Array[i - rounds].setRole("god");
            }
        }
    }
    //Imprimimos los roles de cada player
    prompt("Los roles son los siguientes: \n"
        + "player " + players_Array[0].getId() + " es " + players_Array[0].getRole() + "\n"
        + "player " + players_Array[1].getId() + " es " + players_Array[1].getRole() + "\n"
        + "player " + players_Array[2].getId() + " es " + players_Array[2].getRole());
    deck = generate_deck();
    var board = new Array;
    cards_in_hand = true;
    //Se reparten cartas a todos menos al dios
    for (var _i = 0, players_Array_1 = players_Array; _i < players_Array_1.length; _i++) {
        var element = players_Array_1[_i];
        if (element.getRole() != "god") {
            var player_deck = new Array;
            for (var j = 0; j < 3; j++) {
                index = Math.floor(Math.random() * (deck.length));
                player_deck.push(deck[index]);
                if (index > -1) {
                    deck.splice(index, 1);
                }
            }
            element.setCards(player_deck);
        }
    }
    rule = setRule();
    prompt("                                 INICIA NUEVA RONDA");
    first_card_index = getFirstCard(rule, deck);
    var card = deck[first_card_index];
    board.push(card);
    if (first_card_index > -1) {
        deck.splice(first_card_index, 1);
    }
    while (!(rule_discovered) && cards_in_hand) {
        if (player_turn > players_Array.length) {
            player_turn = 0;
        }
        else {
            if (players_Array[player_turn - 1].getRole() == "god") {
                prompt("Es turno del dios, nadie juega, se pasa");
            }
            else {
                var cards_player = players_Array[player_turn - 1].getCards();
                answer = prompt(" TU TURNO JUGADOR " + player_turn + " con id " + players_Array[player_turn - 1].getId() + " " + player_turn + " " + players_Array[player_turn - 1].getRole()
                    + "\n" + printEstadoJuego(board, no_world)
                    + "\nSus cartas son: " + cards_player
                    + "\nDesea...\n1. Colocar una carta \n2. Decir que no tiene carta para poner\n3. Adivinar");
                //Si decide colocar una carta
                if (answer == "1") {
                    var selected_card_index = select_card(players_Array[player_turn - 1]);
                    var selected_card = cards_player[selected_card_index];
                    //Verifica si la carta que selecciono el jugador es correcta       
                    if (verify_Card(rule, board[board.length - 1].valueAndSymbol(), selected_card.valueAndSymbol())) {
                        selected_card.setIsValid(true);
                        board.push(selected_card);
                        if (selected_card_index > -1) {
                            cards_player.splice(selected_card_index, 1);
                        }
                        players_Array[player_turn - 1].setCards(cards_player);
                        if (cards_player.length == 0) {
                            cards_in_hand = false;
                        }
                    }
                    //Si es incorrecta se va al no world
                    else {
                        no_world.push((board[board.length - 1] + " y " + selected_card + " no siguen la regla\n"));
                        if (selected_card_index > -1) {
                            cards_player.splice(selected_card_index, 1);
                        }
                        cards_player.push(deck[Math.floor(Math.random() * (deck.length))]);
                        players_Array[player_turn - 1].setCards(cards_player);
                        prompt("No puedes jugar esa carta, se va al no mundo");
                    }
                }
                //Si decide que no tiene carta para jugar
                else if (answer == "2") {
                    var no_card_playable = false;
                    //Recorre todo el array de cartas del jugador para ver si alguna cumple con la regla
                    for (var _a = 0, cards_player_1 = cards_player; _a < cards_player_1.length; _a++) {
                        var element = cards_player_1[_a];
                        //Si al menos una cumple, se le da una carta más al jugador y se cambia el valor de no_card_playable
                        if (verify_Card(rule, board[board.length - 1].valueAndSymbol(), element.valueAndSymbol())) {
                            prompt("Tiene una carta que sí cumple la regla, por fallar se le dará otra");
                            cards_player.push(deck[Math.floor(Math.random() * (deck.length))]);
                            players_Array[player_turn - 1].setCards(cards_player);
                            no_card_playable = true;
                            break;
                        }
                    }
                    //Si realmente no tiene una carta que pueda jugar, se le quita una carta al azar
                    if (!(no_card_playable)) {
                        prompt("Entro correctamente a no tiene carta para jugar");
                        var new_hand = new Array();
                        if (cards_player.length - 1 > 0) {
                            for (var new_card = 0; new_card < cards_player.length - 1; new_card++) {
                                var index_2 = void 0;
                                index_2 = Math.floor(Math.random() * (deck.length));
                                new_hand.push(deck[index_2]);
                                if (index_2 > -1) {
                                    deck.splice(index_2, 1);
                                }
                            }
                            players_Array[player_turn - 1].setCards(new_hand);
                        }
                        //Si solo tiene una carta cards_in_hand se vuelve false
                        else {
                            cards_in_hand = false;
                        }
                    }
                }
                //Si decide adivinar
                else if (answer == "3") {
                    rule_discovered = guess_rule(rule);
                }
            }
        }
        player_turn++;
        answer = "";
        index = -1;
    }
    //Se suman 3 puntos cuando se acaban las cartas
    if (!(cards_in_hand)) {
        prompt("El jugador " + (player_turn - 1) + " ha quedado sin cartas");
        players_Array[player_turn - 2].setScore(players_Array[player_turn - 2].getScore() + 3);
        for (var _b = 0, players_Array_2 = players_Array; _b < players_Array_2.length; _b++) {
            var element = players_Array_2[_b];
            if (element.getRole() == "god") {
                element.setScore(element.getScore() + 3);
            }
        }
        for (var _c = 0, players_Array_3 = players_Array; _c < players_Array_3.length; _c++) {
            var element = players_Array_3[_c];
            prompt("El " + element.getRole() + " con id" + element.getId() + " tiene " + element.getScore());
        }
    }
    //Se suman 6 puntos cuando se acaban las cartas
    else {
        prompt("El jugador " + (player_turn - 1) + " ha adivinado la regla");
        players_Array[player_turn - 2].setScore(players_Array[player_turn - 2].getScore() + 6);
        for (var _d = 0, players_Array_4 = players_Array; _d < players_Array_4.length; _d++) {
            var element = players_Array_4[_d];
            if (element.getRole() == "god") {
                element.setScore(element.getScore() + 6);
            }
        }
        for (var _e = 0, players_Array_5 = players_Array; _e < players_Array_5.length; _e++) {
            var element = players_Array_5[_e];
            prompt("El " + element.getRole() + " con id" + element.getId() + " tiene " + element.getScore());
        }
    }
    //Se limpian variables
    rounds++;
    rule = [];
    rule_discovered = false;
    board = [];
    no_world = [];
    player_turn = 1;
}
