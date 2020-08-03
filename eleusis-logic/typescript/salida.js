//Clase de Jugador
var Player = /** @class */ (function () {
    function Player(role, cards) {
        this.cards_owned = [];
        this.role = role;
        this.cards_owned = cards;
        this.score = 0;
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
    Player.prototype.getRole = function () {
        return this.role;
    };
    Player.prototype.getCards = function () {
        return this.cards_owned;
    };
    Player.prototype.setScore = function (score) {
        this.score = score;
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
//Función para crear un deck de cartas nuevo
function generate_deck() {
    var all_Cards = new Array();
    /*
    Y = yellow
    R = Red
    G = Green
    B = Blue
    */
    var colors = new Array("Y", "R", "G", "B");
    var numbers = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13");
    for (var i = 0; i < 2; i++) {
        for (var j in colors) {
            for (var k in numbers) {
                all_Cards.push(numbers[k] + colors[j]);
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
            console.log("se prohibira " + rule_p3 + " se compara compara con " + card);
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
                console.log("El orden es " + rule_p3 + " se compara compara con " + card);
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
function printEstadoJuego(deck, no_world) {
    var mensaje;
    mensaje = "El tablero esta de esta manera: " + deck + "\nLas combinaciones incorrectas han sido: \n";
    if (!(no_world.length == 0)) {
        for (var _i = 0, no_world_1 = no_world; _i < no_world_1.length; _i++) {
            var element = no_world_1[_i];
            mensaje = mensaje + element;
        }
    }
    else {
        mensaje = mensaje + "Aun no han habido errores";
    }
    return mensaje;
}
function verify_Card(rule_info, last_card, card) {
    var rule_p1 = rule_info[0];
    var rule_p2 = rule_info[1];
    var rule_p3 = rule_info[2];
    if (rule_p1 == 0) {
        card = card.charAt(card.length - 1);
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
        card = card.slice(0, card.length - 1);
        prompt(card + "se compara con " + rule_p3);
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
/*
MAIN
*/
var prohphets_number = 2;
var player_turn = 1;
var deck = new Array;
deck = generate_deck();
var board = new Array;
var no_world = new Array;
var players_Array = new Array;
//Se le dan las cartas
for (var i = 0; i < prohphets_number + 1; i++) {
    if (i < prohphets_number) {
        var player_deck = new Array;
        for (var j = 0; j < 3; j++) {
            var index;
            index = Math.floor(Math.random() * (deck.length));
            player_deck.push(deck[index]);
            if (index > -1) {
                deck.splice(index, 1);
            }
        }
        var new_Player = new Player('prophet', player_deck);
    }
    else {
        var new_Player = new Player('god', null);
    }
    players_Array.push(new_Player);
}
//Se elige la regla
var answer = prompt("Desea poner una regla de colores 1. si 2. no\n");
var rule = new Array;
var guessed_rule = new Array;
if (answer == "1") {
    rule.push(0);
    answer = prompt("Elija una de reglas existentes con colores: \n"
        + "1. Los colores que elija no estaran permitidos\n"
        + "2. Un orden de color que usted desea\n");
    if (answer == "1") {
        var color_rule = prompt("Ingrese hasta tres colores que desee prohibir\nY= yellow\nR= red\nB= blue\nG= green\n");
        rule.push(0);
        rule.push(color_rule.toUpperCase());
    }
    else {
        var color_rule = prompt("Ingrese el orden que desee (si no usa todos los colores, no estaran permitidos)\nY= yellow\nR= red\nB= blue\nG= green\n");
        rule.push(1);
        rule.push(color_rule.toUpperCase());
    }
}
else {
    rule.push(1);
    answer = prompt("Elija una de reglas existentes con numeros: \n1. multiplos del numero que usted elija\n2. mayor al numero que usted elija\n3. menor al numero que usted desee\n4. prohibir un numero\n");
    if (answer == "1") {
        var number_rule = prompt("Ingrese el numero que desee menor o igual a 13: ");
        rule.push(0);
        rule.push(number_rule);
    }
    else if (answer == "2") {
        var number_rule = prompt("Ingrese el numero que desee menor o igual a 13: ");
        rule.push(1);
        rule.push(number_rule);
    }
    else if (answer == "3") {
        var number_rule = prompt("Ingrese el numero que desee menor o igual a 13:");
        rule.push(2);
        rule.push(number_rule);
    }
    else {
        var number_rule = prompt("Ingrese el numero que desea prohibir");
        rule.push(3);
        rule.push(number_rule);
    }
}
console.log("                                 INICIA EL JUEGO");
var first_card_validity = false;
while (!(first_card_validity)) {
    if (rule[0] == 0) {
        index = Math.floor(Math.random() * (deck.length));
        var card = deck[index];
        var card_letter = card.charAt(card.length - 1);
        first_card_validity = verify_First(rule, card_letter);
    }
    else {
        index = Math.floor(Math.random() * (deck.length));
        var card = deck[index];
        var card_number = card.slice(0, card.length - 1);
        first_card_validity = verify_First(rule, card_number);
    }
}
board.push(card);
if (index > -1) {
    deck.splice(index, 1);
}
var rule_discovered = false;
var cards_in_hand = true;
while (!(rule_discovered) && cards_in_hand) {
    if (players_Array[player_turn - 1].getRole() == "god") {
        if (player_turn == players_Array.length) {
            player_turn = 0;
        }
        else {
            player_turn++;
        }
    }
    else {
        var cards_player = players_Array[player_turn - 1].getCards();
        answer = prompt(" TU TURNO JUGADOR " + player_turn
            + "\n" + printEstadoJuego(board, no_world)
            + "\nSus cartas son: " + cards_player
            + "\nDesea...\n1. Colocar una carta \n2. Decir que no tiene carta para poner\n3. Adivinar");
        //Si decide colocar una carta
        if (answer == "1") {
            var valid_card = false;
            while (!(valid_card)) {
                answer = prompt(printEstadoJuego(board, no_world)
                    + "\nSus cartas son: " + cards_player
                    + "\nEscriba su carta");
                var letter_answer = answer.charAt(answer.length - 1);
                var number_answer = answer.slice(0, answer.length - 1);
                letter_answer = letter_answer.toUpperCase();
                answer = number_answer + letter_answer;
                if (cards_player.includes(answer)) {
                    index = cards_player.indexOf(answer);
                    valid_card = true;
                }
                else {
                    prompt("Elija una carta que tenga, eligio " + answer);
                }
            }
            //Verifica si la carta que selecciono el jugador es correcta    
            prompt(cards_player[index]);
            if (verify_Card(rule, board[board.length - 1], cards_player[index])) {
                prompt("Correcto");
                board.push(cards_player[index]);
                if (index > -1) {
                    cards_player.splice(index, 1);
                }
                players_Array[player_turn - 1].setCards(cards_player);
                if (cards_player.length == 0) {
                    cards_in_hand = false;
                }
            }
            //Si es incorrecta se va al no world
            else {
                no_world.push((board[board.length - 1] + " y " + cards_player[index] + " no siguen la regla\n"));
                if (index > -1) {
                    cards_player.splice(index, 1);
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
            for (var _i = 0, cards_player_1 = cards_player; _i < cards_player_1.length; _i++) {
                var element = cards_player_1[_i];
                prompt("prueba 1");
                //Si al menos una cumple, se le da una carta más al jugador y se cambia el valor de no_card_playable
                if (verify_Card(rule, board[board.length - 1], element)) {
                    prompt("prueba 1");
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
                        var index;
                        index = Math.floor(Math.random() * (deck.length));
                        new_hand.push(deck[index]);
                        if (index > -1) {
                            deck.splice(index, 1);
                        }
                    }
                    players_Array[player_turn - 1].setCards(new_hand);
                }
                //Si solo tiene una carta cards_in_hand se vuelve false
                else {
                    prompt("prueba2");
                    cards_in_hand = false;
                }
            }
        }
        /*else if (answer == "3"){


        }   */
    }
    //Se le da el turno al siguiente y se limpian las variables 
    player_turn++;
    answer = "";
    index = -1;
}
if (!(cards_in_hand)) {
    console.log("El jugador " + (player_turn - 1) + " ha quedado sin cartas");
    players_Array[player_turn - 2].setScore(players_Array[player_turn - 2].getScore() + 3);
    for (var _a = 0, players_Array_1 = players_Array; _a < players_Array_1.length; _a++) {
        var element = players_Array_1[_a];
        if (element.getRole() == "god") {
            element.setScore(element.getScore() + 3);
        }
    }
    for (var _b = 0, players_Array_2 = players_Array; _b < players_Array_2.length; _b++) {
        var element = players_Array_2[_b];
        console.log("El " + element.getRole() + " tiene " + element.getScore());
    }
}
else {
    console.log("El jugador " + (player_turn - 1) + " ha adivinado la regla");
    players_Array[player_turn - 1].setScore(players_Array[player_turn - 1].getScore() + 6);
    for (var _c = 0, players_Array_3 = players_Array; _c < players_Array_3.length; _c++) {
        var element = players_Array_3[_c];
        if (element.getRole() == "god") {
            element.setScore(element.getScore() + 6);
        }
    }
    for (var _d = 0, players_Array_4 = players_Array; _d < players_Array_4.length; _d++) {
        var element = players_Array_4[_d];
        console.log("El " + element.getRole() + " tiene " + element.getScore());
    }
}
