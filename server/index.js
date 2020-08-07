var server = require('ws').Server;
var s = new server({ port: 8080 });

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

    while (true) {
      const nuevaSala = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      if (salas[nuevaSala] == undefined) {
        //No existe esa sala
        console.log(nuevaSala);

        client.send(
          JSON.stringify({
            option: 1,
            sala: nuevaSala,
            Players: 'Player[]',
            DealerId: 0,
            PlayerTurnId: 'number',
            HostId: 0,
            Rounds: 'number',
            myId: 0,
          })
        );

        salas[nuevaSala] = {
          Players: [client],
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
    } else {
      // si existe la sala a la que  se quiere unir
      client.send(
        JSON.stringify({
          option: 1,
          sala: request.sala,
          Players: 'Player[]',
          DealerId: 0,
          PlayerTurnId: 'number',
          HostId: 0,
          Rounds: 'number',
          myId: salas[request.sala].Players.length,
        })
      );

      salas[request.sala].Players.push(client);
      console.log('Se une a una sala');
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

  salas[JSON.parse(request).sala].Players.forEach(function each(client) {
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
