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
  if (salas[request.sala] == undefined) {
    /*
      no existe la sala, entonces se crea una
    */
    salas[request.sala] = {
      Players: [client],
      Deck: [],
      Regla: '',
      CartasAplican: [],
      CartasNoAplican: [],
      Dios: null,
      Turno: null,
    };

    console.log('Se crea una sala');
  } else {
    /*
      Si existe la sala
    */

    salas[request.sala].Players.push(client);
    console.log('Se une a una sala');
  }
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
  s.clients.forEach(function each(client) {
    if (client !== clientSender) {
      client.send(request);
    }
  });

  //console.log(salas[request.sala].Players);
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
