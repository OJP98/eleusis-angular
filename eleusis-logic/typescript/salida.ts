//Clase de Jugador
class Player{
    
    //color: string;
    //number_Card: number;
    role: string;
    cards_owned = [];
    score: number;
    
    constructor(role, cards) {
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

    getScore(){
        return this.score;
    }

    getRole(){
        return this.role;
    }

    getCards(){
        return this.cards_owned;
    }

    setScore(score: number):void {
        this.score = score;        
    }
    
    setCards(cards):void {
        this.cards_owned = cards;        
    }

    getLenCards(){
        return this.cards_owned.length
    }

    toString(){
        return "El rol del jugador es " + this.role + " y su puntaje es " + this.score + ".\nSus cartas son: " + this.cards_owned;
    }

   }

//Función para crear un deck de cartas nuevo
function generate_deck(){
    var all_Cards = new Array(); 
    /*
    Y = yellow
    R = Red
    G = Green
    B = Blue
    */
   var colors = new Array("Y", "R", "G", "B"); 
   var numbers = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11", "12", "13");
    for (var i = 0; i < 2; i++) {
        for (var j in colors) {
            for (var k in numbers) {
                all_Cards.push(numbers[k]+colors[j]);     
            }
        } 
      }
    return all_Cards;
   }

//Funcion para verificar la primera carta
function verify_First(rule_info,card){
    const rule_p1 = rule_info[0];
    const rule_p2 = rule_info[1];
    const rule_p3 = rule_info[2];
    if (rule_p1 == 0){
        //card = card[len(card)-1]
        //Verifica que la carta tiene uno de los colores permitidos
        if (rule_p2 == 0){
            console.log("se prohibira "+ rule_p3 + " se compara compara con " +card) 
            if (rule_p3.includes(card)){
                return false;
            }
            else{
                return true;
            }
        }
        //verifica que la carta tenga color permitido (al ser la primera no importa en que lugar este)
        else if (rule_p2 == 1){
            if (rule_p3.includes(card)){
                console.log("El orden es "+ rule_p3 + " se compara compara con " +card) 
                //Verifica que este dentro de las permitidas, si no lo esta devuelve un False
                return true;
            }
            else{
                //Verifica que este dentro de las permitidas, si lo esta devuelve un True
                return false;
            }
            
        }       
    } else{
        if (rule_p2 == 0){
            //Se verifica que sea multiplo
            var resultado = card%rule_p3;            
            if (resultado == 0){
                return true;
            }else{
                return false;
            }
        }
           
        else if (rule_p2 == 1){
            //Se verifica que el numero sea mayor al indicado
            if (Number(card) >= Number(rule_p3)){
                return true;
            }
            else{
                return false;
            }
                
        }
        else if (rule_p2 == 2){
            //Se verifica que el numero sea menor al indicado
            if (Number(card) <= Number(rule_p3)){
                return true;
            }
            else{
                return false;
            }

        }            
        else{
            //El numero es el prohibido
            if (card == rule_p3){
                return false
            }
            else{
                return true
            }
        }
    }
}

function printEstadoJuego(deck,no_world){
    let mensaje: string;
    mensaje = "El tablero esta de esta manera: " + deck + "\nLas combinaciones incorrectas han sido: \n";
    if (!(no_world.length == 0)){
        for (let element of no_world){
            mensaje = mensaje + element;
        }        
    }else{
        mensaje = mensaje + "Aun no han habido errores"
    }
    return mensaje;
}

function verify_Card(rule_info,last_card,card){
    const rule_p1 = rule_info[0];
    const rule_p2 = rule_info[1];
    const rule_p3 = rule_info[2];
    if (rule_p1 == 0){
        card = card.charAt(card.length-1);
        //Verifica que la carta no tenga uno de los colores prohibidos
        if (rule_p2 == 0){
            if (rule_p3.includes(card)){
                return false;
            }
            else{
                return true;
            }            
        }
        //Verifica que la carta tenga color permitido y orden correcto
        else{
            last_card = last_card.charAt(last_card.length-1);
            const pivot = last_card + card;
            const pivotRule =  rule_p3 + rule_p3;
            if (pivotRule.includes(pivot)){
                //Si esta en el orden correcto devuelve true
                return true
            }
            else{
                //Si no esta en el orden correcto devuelve False
                return false
            }    
        }                
    }
    else{
        card = card.slice(0, card.length-1);
        prompt(card+"se compara con " + rule_p3);
        if (rule_p2 == 0){
            //Se verifica que sea multiplo
            var resultado = card%rule_p3;            
            if (resultado == 0){
                return true;
            }else{
                return false;
            }
        }
           
        else if (rule_p2 == 1){
            //Se verifica que el numero sea mayor al indicado
            if (Number(card) >= Number(rule_p3)){
                return true;
            }
            else{
                return false;
            }
                
        }
        else if (rule_p2 == 2){
            //Se verifica que el numero sea menor al indicado
            if (Number(card) <= Number(rule_p3)){
                return true;
            }
            else{
                return false;
            }

        }            
        else{
            //El numero es el prohibido
            if (card == rule_p3){
                return false
            }
            else{
                return true
            }
        }
    }
}

/*
MAIN
*/
var prohphets_number: number =2;
var player_turn: number = 1;
var deck = new Array;
deck = generate_deck()
var board = new Array;
var no_world = new Array;
var players_Array = new Array;

//Se le dan las cartas
for (var i = 0; i < prohphets_number+1; i++){
    if (i<prohphets_number){
        var player_deck = new Array;
        for (var j = 0; j < 12; j++){
            var index: number;
            index = Math.floor(Math.random()*(deck.length)+1);
            player_deck.push(deck[index]);
            if (index > -1) {
                deck.splice(index, 1);
            }
        }
        var new_Player = new Player('prophet',player_deck);
    }else{
        var new_Player = new Player('god',null);
    }
    players_Array.push(new_Player);
}


//Se elige la regla
var answer = prompt("Desea poner una regla de colores 1. si 2. no\n");
var rule= new Array;
var guessed_rule= new Array;
if (answer == "1"){
    rule.push(0);
    answer = prompt("Elija una de reglas existentes con colores: \n"
              +"1. Los colores que elija no estaran permitidos\n"
              +"2. Un orden de color que usted desea\n");
    if (answer=="1"){
        var color_rule = prompt("Ingrese hasta tres colores que desee prohibir\nY= yellow\nR= red\nB= blue\nG= green\n");
        rule.push(0);
        rule.push(color_rule.toUpperCase());
    }
    else{
        var color_rule = prompt("Ingrese el orden que desee (si no usa todos los colores, no estaran permitidos)\nY= yellow\nR= red\nB= blue\nG= green\n");
        rule.push(1);
        rule.push(color_rule.toUpperCase());
   }      
}
else{
    rule.push(1);
    answer = prompt("Elija una de reglas existentes con numeros: \n1. multiplos del numero que usted elija\n2. mayor al numero que usted elija\n3. menor al numero que usted desee\n4. prohibir un numero\n");
    if (answer=="1"){
        var number_rule = prompt("Ingrese el numero que desee menor o igual a 13: ");
        rule.push(0);
        rule.push(number_rule);
    }
    else if (answer == "2"){
        var number_rule = prompt ("Ingrese el numero que desee menor o igual a 13: ");
        rule.push(1);
        rule.push(number_rule)
    }
    else if (answer =="3"){
        var number_rule = prompt("Ingrese el numero que desee menor o igual a 13:");
        rule.push(2);
        rule.push(number_rule);
    }
    else{
        var number_rule = prompt("Ingrese el numero que desea prohibir");
        rule.push(3);
        rule.push(number_rule);
    }
            
}

console.log ("                                 INICIA EL JUEGO");

let first_card_validity = false;

while (!(first_card_validity)) {
    if (rule[0] == 0){
        index = Math.floor(Math.random()*(deck.length)+1);
        var card = deck[index]
        var card_letter = card.charAt(card.length-1);
        first_card_validity = verify_First(rule,card_letter)
    } 
    else{
        index = Math.floor(Math.random()*(deck.length)+1);
        var card = deck[index];
        var card_number = card.slice(0, card.length-1);
        first_card_validity = verify_First(rule,card_number);
    }
            
                   
}

board.push(card);
if (index > -1) {
    deck.splice(index, 1);
}
var rule_discovered: boolean = false;

while (!((rule_discovered))){

    if (players_Array[player_turn-1].getRole() == "god"){
        if (player_turn == players_Array.length){
            player_turn = 1;
        }
        else{
            player_turn ++;
        }
    }else{
        var cards_player = players_Array[player_turn-1].getCards();
        answer = prompt(" TU TURNO JUGADOR "+ player_turn
                        +"\n" + printEstadoJuego(board,no_world) 
                        + "\nSus cartas son: " + cards_player
                        +"\nDesea...\n1. Colocar una carta \n2. Decir que no tiene carta para poner\n");
        if (answer == "1"){
            var valid_card: boolean= false;
            while (!(valid_card)){
                answer = prompt(printEstadoJuego(board,no_world) 
                                + "\nSus cartas son: " + cards_player
                                +"\nEscriba su carta");
                var letter_answer = answer.charAt(answer.length-1);
                var number_answer = answer.slice(0, answer.length-1);
                letter_answer = letter_answer.toUpperCase();
                answer= number_answer + letter_answer;
                if (cards_player.includes(answer)){
                    index = cards_player.indexOf(answer);
                    valid_card = true;
                }else{
                    prompt("Elija una carta que tenga, eligio " + answer);
                }
            }  
                       
        }

        //Verifica si la carta que selecciono el jugador es correcta    
        prompt(cards_player[index]);       
        if (verify_Card(rule,board[board.length-1],cards_player[index])){
            prompt("Correcto");
            board.push(cards_player[index]);
            if (index > -1) {
                cards_player.splice(index, 1);
            }
            cards_player.pop(i)
            players_Array[player_turn-1].setCards(cards_player)
        }
           
        else{
            no_world.push((board[board.length-1] + " y "+ cards_player[index]+ " no siguen la regla\n"))
            if (index > -1) {
                cards_player.splice(index, 1);
            }
            cards_player.push(deck[Math.floor(Math.random()*(deck.length)+1)]);
            players_Array[player_turn-1].setCards(cards_player);
            prompt("No puedes jugar esa carta, se va al no mundo")
        }

        player_turn++;
        answer = "";
        index = -1;
        
    }

}


  
   

