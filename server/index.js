// print process.argv

var server = require('ws').Server;

try {
  var s = new server({ port: process.argv[2] });
} catch (error) {
  var s = new server({ port: 8080 });
}

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
      this.character = 'J';
    } else if (Number(value) == 12) {
      this.character = 'Q';
    } else if (Number(value) == 13) {
      this.character = 'K';
    }
  } else if (Number(value) == 1) {
    this.character = 'A';
  } else {
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
            PlayerTurnId: 1,
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
          CantidadCartas: [0],
          Puntos: [0],
          PuntosAcumulados: [0],
          Dios: 0,
          Turno: 1,
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
      salas[request.sala].CantidadCartas.push(0);
      salas[request.sala].Puntos.push(0);
      salas[request.sala].PuntosAcumulados.push(0);

      client.send(
        JSON.stringify({
          option: 1,
          sala: request.sala,
          Players: salas[request.sala].Players,
          DealerId: 0,
          PlayerTurnId: 1,
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
  var symbol = new Array('spades', 'hearts', 'clubs', 'diamonds');
  var numbers = new Array(
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13'
  );
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
  var deck = generar_deck();
  salas[sala].Sockets.forEach(function each(clientLoop) {
    // cada iteracion es un cliente menos el Dios
    if (clientLoop !== God) {
      // Array para guardar las 12 cartas
      var player_deck = new Array();
      //Se entra a un for, donde se repartiran 12 cartas
      for (var j = 0; j < 12; j++) {
        var index = Math.floor(Math.random() * deck.length);
        player_deck.push(deck[index]);
        if (index > -1) {
          deck.splice(index, 1);
        }
      }
      console.log(player_deck);
      clientLoop.send(
        JSON.stringify({
          option: 4,
          cartas: [player_deck],
        })
      );
    }
  });
  salas[sala].Deck = deck;

  //Se inicializan cuantas cartas tiene cada jugador
  for (let index = 0; index < salas[sala].CantidadCartas.length; index++) {
    if (index === salas[sala].Dios) continue;

    salas[sala].CantidadCartas[index] = 12;
  }
  console.log(salas[sala]);
}

function IniciarJuego(request, client) {
  salas[JSON.parse(request).sala].JuegoIniciado = true;

  RepartirCartas(JSON.parse(request).sala, client);
}

function VerificarCarta(
  secret_rule,
  symbol_card_selected,
  value_card_selected
) {
  //Si la regla seleccionada es por numeros entra a este if
  if (secret_rule[0] == 0) {
    //Si la regla es de multiplos entra a este if
    if (secret_rule[1] == 0) {
      let resultado = value_card_selected % Number(secret_rule[2]);
      //Si la carta no es multiplo del numero que  el dios selecciono es jugable
      if (resultado != 0) {
        return true;
      } else {
        return false;
      }
    }
    //Si la regla es que sea menor entra a este if
    else if (secret_rule[1] == 1) {
      //Si la carta es menor al numero que  el dios selecciono es jugable
      if (Number(secret_rule[2]) >= value_card_selected) {
        return true;
      } else {
        return false;
      }
    }
    //Si la regla es que sea mayor entra a este if
    else if (secret_rule[1] == 2) {
      //Si la carta no es mayor al numero que  el dios selecciono es jugable
      if (value_card_selected >= Number(secret_rule[2])) {
        return true;
      } else {
        return false;
      }
    }
    //Si la regla es que no sea igual al numero que selecciono entra a este if
    else if (secret_rule[1] == 3) {
      // Si el numero de la carta no es el mismo a que el dios eligio es jugable
      if (value_card_selected != Number(secret_rule[2])) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    if (secret_rule[2] != symbol_card_selected) {
      return true;
    } else {
      return false;
    }
  }
}

function GetNextTurno(sala) {
  /*
  Players
Dios: 0,
          Turno: 1,
  */
  let turnoActual = salas[sala].Turno;
  const cantidadJugadores = salas[sala].Players.length;
  const idDios = salas[sala].Dios;

  while (true) {
    turnoActual = turnoActual + 1;

    if (turnoActual < cantidadJugadores && turnoActual !== idDios) {
      salas[sala].Turno = turnoActual;
      return turnoActual;
    }

    if (turnoActual > cantidadJugadores) {
      turnoActual = -1;
    }
  }
}

function ActualizarMesa(salaActual, character, symbol, value, isValid) {
  console.log('Se actualiza la mesa');
  console.log(character);
  const nuevoTurno = GetNextTurno(salaActual);
  salas[salaActual].Sockets.forEach(function each(client) {
    client.send(
      JSON.stringify({
        option: 6,
        carta: {
          character,
          symbol,
          value,
          isValid,
        },
        turno: nuevoTurno,
      })
    );
  });
}

function GetIndexPlayer(client, sala) {
  for (let index = 0; index < salas[sala].Sockets.length; index++) {
    if (client === salas[sala].Sockets[index]) {
      console.log('Es el jugador');
      console.log(index);
      return index;
    }
  }
}

function ActualizarNumCartas(sala, index, cantidadAgregar) {
  salas[sala].CantidadCartas[index] += cantidadAgregar;
  console.log(salas[sala].CantidadCartas);
}

function ActualizarPuntos(sala, index, cantidadAgregar) {
  salas[sala].Puntos[index] += cantidadAgregar;
  console.log(salas[sala].Puntos);
}

function GetNumCartas(sala, index) {
  return salas[sala].CantidadCartas[index];
}

function CalcularPuntos(sala) {
  const DiosId = salas[sala].Dios;
  for (let index = 0; index < salas[sala].Sockets.length; index++) {
    if (index === DiosId) continue;

    const puntosJugador = (salas[sala].Puntos[index] =
      12 - salas[sala].CantidadCartas[index] + salas[sala].Puntos[index]);
  }
}

function GetNuevoDios(sala) {
  const nuevoDios = salas[sala].Dios + 1;
  if (nuevoDios < salas[sala].Sockets.length) {
    salas[sala].Dios = nuevoDios;
    return nuevoDios;
  } else return -1;
}

function GetNuevoTurno(sala) {
  const nuevoTurno = salas[sala].Dios + 1;
  if (nuevoTurno < salas[sala].Sockets.length) return nuevoTurno;
  else return 0;
}

function GetGanadorAcumulado(sala) {
  const maxPuntos = Math.max.apply(null, salas[sala].PuntosAcumulados);
  for (let index = 0; index < salas[sala].PuntosAcumulados.length; index++) {
    if (maxPuntos === salas[sala].PuntosAcumulados[index]) return index;
  }
}

function EnviarPunteo(sala) {
  CalcularPuntos(sala);
  console.log('entra a Enviar Punteo');
  console.log(sala);
  const maxPuntos = Math.max.apply(null, salas[sala].Puntos);
  const DiosId = salas[sala].Dios;

  console.log(salas[sala].Sockets[DiosId]);

  salas[sala].Puntos[DiosId] = maxPuntos;

  const idNuevoDios = GetNuevoDios(sala);
  const idTurno = GetNuevoTurno(sala);
  salas[sala].Dios = idNuevoDios;
  salas[sala].Turno = idTurno;
  for (let index = 0; index < salas[sala].Sockets.length; index++) {
    salas[sala].Sockets[index].send(
      JSON.stringify({
        option: 9,
        puntos: salas[sala].Puntos[index],
        ganador: salas[sala].Puntos[index] === maxPuntos,
        Dios: idNuevoDios,
        Players: salas[sala].Players,
        turno: idTurno,
        idGanador: GetGanadorAcumulado(sala),
      })
    );
  }
  NuevaRonda(sala);
}

function NuevaJugada(request, client) {
  let secret_rule = salas[JSON.parse(request).sala].Regla;
  let symbol_card_selected = JSON.parse(request).simbolo;
  let value_card_selected = JSON.parse(request).valor;
  let deck = salas[JSON.parse(request).sala].Deck;
  let character_card = JSON.parse(request).character;

  let valid_card = VerificarCarta(
    secret_rule,
    symbol_card_selected,
    value_card_selected
  );

  if (valid_card) {
    console.log('es correcta, la carta es jugable');

    ActualizarNumCartas(
      JSON.parse(request).sala,
      GetIndexPlayer(client, JSON.parse(request).sala),
      -1
    );

    if (
      GetNumCartas(
        JSON.parse(request).sala,
        GetIndexPlayer(client, JSON.parse(request).sala)
      ) === 0
    ) {
      //El jugador se quedo sin cartas
      //Le damos +3 puntos
      console.log('El jugador se quedo sin cartas');
      ActualizarPuntos(
        JSON.parse(request).sala,
        GetIndexPlayer(client, JSON.parse(request).sala),
        3
      );

      //Mandamos puntos a todos los jugadores
      EnviarPunteo(JSON.parse(request).sala);
    }

    client.send(
      JSON.stringify({
        option: 5,
        valido: true,
      })
    );

    ActualizarMesa(
      JSON.parse(request).sala,
      character_card,
      symbol_card_selected,
      value_card_selected,
      true
    );
  } else {
    console.log('es incorrecta, la carta no es jugable');
    let index = Math.floor(Math.random() * deck.length);
    //new_card tiene la nueva carta que se debe envíar
    let new_card = deck[index];

    client.send(
      JSON.stringify({
        option: 5,
        valido: false,
        carta: new_card,
      })
    );

    ActualizarMesa(
      JSON.parse(request).sala,
      character_card,
      symbol_card_selected,
      value_card_selected,
      false
    );

    //Se elimina la carta nueva del deck
    if (index > -1) {
      deck.splice(index, 1);
    }
    salas[JSON.parse(request).sala].Deck = deck;
  }
}

function ActualizarMesaSinCarta(sala) {
  const nuevoTurno = GetNextTurno(sala);
  salas[sala].Sockets.forEach(function each(client) {
    client.send(
      JSON.stringify({
        option: 6,
        turno: nuevoTurno,
      })
    );
  });
}

/*
Verifica que ninguna carta cumpla con regla
*/
function verificarMano(secret_rule, cards_in_hand) {
  let no_card_playable = false;
  for (
    let _a = 0, cards_player_1 = cards_in_hand;
    _a < cards_player_1.length;
    _a++
  ) {
    var element = Object.values(cards_player_1[_a]);
    if (element.length == 3) {
      var symbol_card = element[2];
      var value_card = Number(element[1]);
    }
    {
      var symbol_card = element[0];
      var value_card = element[2];
    }
    console.log(value_card);
    console.log(symbol_card);
    //Si al menos una cumple, se le da una carta más al jugador y se cambia el valor de no_card_playable
    if (VerificarCarta(secret_rule, symbol_card, value_card)) {
      console.log('Entra correctamente a esto');
      no_card_playable = true;
      break;
    }
  }

  return no_card_playable;
}

function NoJugada(regla, client, cartas, sala) {
  /*
  Se debe pedir tambien el deck, se me olvido comentarte
  Que variable se llame deck
  */
  console.log('se me olvido comentarte que debia pedir el deck');
  console.log(regla);
  console.log(cartas);
  console.log(verificarMano(regla, cartas));

  let deck = salas[sala].Deck;

  //Si tiene una carta que se puede jugar, envía una carta nueva al jugador
  if (verificarMano(regla, cartas)) {
    let index = Math.floor(Math.random() * deck.length);
    //new_card tiene la nueva carta que se debe envíar
    let new_card = deck[index];
    //Se elimina la carta del deck
    if (index > -1) {
      deck.splice(index, 1);
    }
    //acá ya deberías actualizar como quedo el deck y luego enviar la carta

    salas[sala].Deck = deck;

    ActualizarNumCartas(sala, GetIndexPlayer(client, sala), 1);

    client.send(
      JSON.stringify({
        option: 7,
        valido: false,
        carta: new_card,
      })
    );
    ActualizarMesaSinCarta(sala);

    console.log('la nueva carta es ' + new_card);
  }

  //de lo contrario, se crea una nueva mano al jugador con una carta menos o se
  //envía sus puntos en caso de que ya no tenga más cartas
  else {
    // si tiene mas de una carta en la mano
    if (cartas.length - 1 != 0) {
      //player_deck tiene las nuevas cartas que se deben envía
      let player_deck = new Array();
      for (var j = 0; j < cartas.length - 1; j++) {
        var index = Math.floor(Math.random() * deck.length);
        player_deck.push(deck[index]);
        if (index > -1) {
          deck.splice(index, 1);
        }
      }
      //Aca envias la nueva mano del jugador y además actualizas el deck
      console.log('La nueva mano del jugador es ' + player_deck);

      salas[sala].Deck = deck;

      ActualizarNumCartas(sala, GetIndexPlayer(client, sala), -1);

      client.send(
        JSON.stringify({
          option: 7,
          valido: true,
          carta: player_deck,
        })
      );

      ActualizarMesaSinCarta(sala);
    }
    // si no tiene más de una carta, se envia su punteo
    else {
      ActualizarNumCartas(sala, GetIndexPlayer(client, sala), -1);
      console.log('Usted y el dios tiene tres puntos más. Se acaba la ronda');
      ActualizarPuntos(sala, GetIndexPlayer(client, sala), 3);
      //Mandamos puntos a todos los jugadores
      EnviarPunteo(sala);
    }
  }
}

function verificarReglaAdivinada(secret_rule, guessed_rule) {
  if (
    secret_rule[0] == guessed_rule[0] &&
    secret_rule[1] == guessed_rule[1] &&
    secret_rule[2] == guessed_rule[2]
  ) {
    return true;
  } else {
    return false;
  }
}

function AdivinarRegla(sala, intentoRegla, client) {
  console.log(salas[sala].Regla);
  console.log(intentoRegla);
  let secret_rule = salas[sala].Regla;
  if (verificarReglaAdivinada(secret_rule, intentoRegla)) {
    console.log('La adivino se debería enviar 6 puntos al jugador y al dios');
    client.send(
      JSON.stringify({
        option: 8,
        valido: true,
      })
    );

    ActualizarPuntos(sala, GetIndexPlayer(client, sala), 6);

    //Mandamos puntos a todos los jugadores
    EnviarPunteo(sala);

    console.log('Cambiar de ronda');
  } else {
    console.log('Se equivoco pero no pasa nada');
    client.send(
      JSON.stringify({
        option: 8,
        valido: false,
      })
    );
    ActualizarMesaSinCarta(sala);
  }
}

function NuevaRonda(sala) {
  for (let index = 0; index < salas[sala].Puntos.length; index++) {
    salas[sala].PuntosAcumulados[index] = salas[sala].Puntos[index];
    salas[sala].Puntos[index] = 0;
  }
  console.log(salas[sala]);
  //RepartirCartas(sala, salas[sala].Sockets[1]);
  /*
  salas[sala].Sockets.forEach(function each(clientLoop) {
    clientLoop.send(
      JSON.stringify({
        option: 1,
        DealerId: 1,
        PlayerTurnId: 2,
        HostId: 0,
        Rounds: 'number',
        myId: 0,
      })
    );
  });
  */
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
  } else if (newRequest.option === 5) {
    //? Nueva Jugada
    console.log(request);
    NuevaJugada(request, client);
  } else if (newRequest.option === 7) {
    //? Nueva Jugada
    //"sala":"7244","cartas"

    NoJugada(
      salas[JSON.parse(request).sala].Regla,
      client,
      JSON.parse(request).cartas,
      JSON.parse(request).sala
    );
  } else if (newRequest.option === 8) {
    console.log('Quiere adivinar ');
    console.log(request);
    AdivinarRegla(
      JSON.parse(request).sala,
      JSON.parse(request).intentoRegla,
      client
    );
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
