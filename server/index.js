var server = require('ws').Server;
var s = new server({ port: 8080 });

/*
Inicia clase Carta
Propiedades:
symbol = nos dice que tipo de carta, puede ser de espadas, corazones, treboles y diamantes. (estas son representados por s,h,c y d, respectivamente)
character = numero de la carta (aca tomamos en cuenta la j, q y k)
value = valor numerico de character
isValid = esto nos dice si la carta sigue la regla o no
*/

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
  else if(Number(value) == 1){
      this.character = "A";
  }
  else{
    this.character = value;
  }
  this.value = Number(value);
  this.isValid = false;
}

/*
Funciones de la clase carta
*/

//gets
Card.prototype.getValue = function () {
  return this.value;
};
Card.prototype.getSymbol = function () {
  return this.symbol;
};
//set
Card.prototype.setIsValid = function (isValid) {
  this.isValid = isValid;
};
//to string (Nos devuelve character y simbolo para formar la carta)
Card.prototype.toString = function () {
  return this.character + this.symbol;
};
//valueAndSymbol nos devuelve el valor numerico y la el simbolo de la carta
Card.prototype.valueAndSymbol = function () {
  return this.value + this.symbol;
};
/*
Termina todo lo relacionado con la clase carta
*/


var salas = {
  /*
  5001: {
    Players: [0],
    Deck: [],
    Regla: '',
    CartasAplican: [],
    CartasNoAplican: [],
    Dios: null,
    Turno: null,
  },
  */
};

function NuevoCliente(request, client) {
  if (request.sala == undefined) {
    /*
      no existe la sala, entonces se crea una
    */
    console.log('Se crea una sala');

    console.log(request);

    while (true) {
      const nuevaSala = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      if (salas[nuevaSala] == undefined) {
        //No existe esa sala
        console.log(nuevaSala);

        nuevoJugador = {
          Id: 0,
          isDealer: true,
          Name: request.user,
          isHost: true,
        };

        client.send(
          JSON.stringify({
            option: 1,
            sala: nuevaSala,
            Players: [nuevoJugador],
            DealerId: 0,
            PlayerTurnId: 'number',
            HostId: 0,
            Rounds: 'number',
            myId: 0,
          })
        );

        salas[nuevaSala] = {
          Sockets: [client],
          Players: [nuevoJugador],
          Deck: [],
          Regla: '',
          CartasAplican: [],
          CartasNoAplican: [],
          Dios: null,
          Turno: null,
        };

        break;
      }
    }
  } else {
    /*
      Si existe la sala
    */
    console.log(salas[request.sala]);

    if (salas[request.sala] == undefined) {
      // No existe la sala a la que se quiere unir
      client.send(
        JSON.stringify({
          option: 0,
          mensaje: `La sala ${request.sala} no existe`,
        })
      );
    } else if (salas[request.sala].JuegoIniciado === true) {
      // Ya comenzo el juego
      client.send(
        JSON.stringify({
          option: 0,
          mensaje: `La sala ${request.sala} ya comenzó el juego`,
        })
      );
    } else {
      // si existe la sala a la que  se quiere unir
      nuevoJugador = {
        Id: salas[request.sala].Sockets.length,
        isDealer: false,
        Name: request.user,
        isHost: false,
      };

      salas[request.sala].Sockets.push(client);
      salas[request.sala].Players.push(nuevoJugador);

      client.send(
        JSON.stringify({
          option: 1,
          sala: request.sala,
          Players: salas[request.sala].Players,
          DealerId: 0,
          PlayerTurnId: 'number',
          HostId: 0,
          Rounds: 'number',
          myId: salas[request.sala].Sockets.length - 1,
        })
      );

      /*
      Se notifica a todos los jugadores de 
      la sala que entro un nuevo jugador
      */
      salas[request.sala].Sockets.forEach(function each(clientLoop) {
        if (clientLoop !== client) {
          clientLoop.send(
            JSON.stringify({
              option: 1,
              Players: salas[request.sala].Players,
            })
          );
        }
      });

      console.log('Se une a una sala');
      console.log(salas[request.sala].Sockets.length - 1);
      console.log(salas[request.sala].Players);
    }
  }
  console.log(request);
  console.log('');
  console.log(salas);
}

function NuevoMensaje(request, clientSender) {
  /*
  this.subject.next({
			option: 2,
			sala: 5001,
			user: 'BigJ',
			id: 0,
			mensaje: mensaje,
		});
  */
  console.log(JSON.parse(request).sala);
  console.log(salas[JSON.parse(request).sala]);

  salas[JSON.parse(request).sala].Sockets.forEach(function each(client) {
    if (client !== clientSender) {
      client.send(request);
    }
  });

  /*
  s.clients.forEach(function each(client) {
    if (client !== clientSender) {
      client.send(request);
    }
  });
  */
}

function SetRegla(request) {
  salas[JSON.parse(request).sala].Regla = JSON.parse(request).regla;

  console.log(salas);
}

//Función para crear un deck de cartas nuevo
function generar_deck() {
  var all_Cards = new Array();
  /*
  Spade = S
  Heart = H
  Club = C
  Diamonds = D
  */
  var symbol = new Array("spades", "hearts", "clubs", "diamonds");
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

//
function RepartirCartas(sala, God) {
  var deck = generar_deck()
  salas[sala].Sockets.forEach(function each(clientLoop) {
    // cada iteracion es un cliente menos el Dios
    if (clientLoop !== God) {
      // Array para guardar las 12 cartas
      var player_deck = new Array;
      //Se entra a un for, donde se repartiran 12 cartas
      for (var j = 0; j < 12; j++) {
        var index = Math.floor(Math.random() * (deck.length));
        player_deck.push(deck[index]);
        if (index > -1) {
            deck.splice(index, 1);
        }
      }
      clientLoop.send(
        JSON.stringify({
          option: 4,
          cartas: [player_deck],
        })
      );
    }
  });
}

function IniciarJuego(request, client) {
  salas[JSON.parse(request).sala].JuegoIniciado = true;

  RepartirCartas(JSON.parse(request).sala, client);
}

function interpreteacionRequest(request, client) {
  const newRequest = JSON.parse(request);

  console.log(`Servidor recibe ${newRequest.option}`);
  if (newRequest.option === 1) {
    //?Request Conectar
    /*
    this.subject.next({
			option: 1,
			sala: 5001,
			user: 'BigJ',
		});
    */
    NuevoCliente(newRequest, client);
  } else if (newRequest.option === 2) {
    //?Request Mensaje
    NuevoMensaje(request, client);
    console.log(newRequest);
  } else if (newRequest.option === 3) {
    //?Request definir regla
    /*
    {"option":3,"sala":4175,"regla":[1,0,"Red"]}
    */
    SetRegla(request);
  } else if (newRequest.option === 4) {
    //?Request inicia el juego
    /*
    {"option":4,"sala":6027}
    */
    IniciarJuego(request, client);
  } else {
    console.log('Otro');
  }
  //console.log(salas);
}

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    interpreteacionRequest(message, ws);
  });

  ws.on('close', function (message) {
    console.log('se cierra un cliente ' + message);
  });

  console.log('cliente conectado ');
});
