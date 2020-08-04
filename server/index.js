var server = require('ws').Server;
var s = new server({ port: 8080 });

var salas = {
  5001: {
    Players: [0],
    Deck: [],
    Regla: '',
    CartasAplican: [],
    CartasNoAplican: [],
    Dios: null,
    Turno: null,
  },
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

    console.log('No existe la sala');
  } else {
    /*
      Si existe la sala
    */

    salas[request.sala].Players.push(client);
    console.log('Si existe la sala');
  }
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
    //*Request Mensaje
  } else {
    console.log('Otro');
  }
  console.log(salas);
}

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    interpreteacionRequest(message, ws);
    const mensaje = {
      name: 'Mensaje del servidor',
    };
    ws.send(JSON.stringify(mensaje));
  });

  ws.on('close', function (message) {
    console.log('se cierra un cliente ' + message);
  });

  console.log('cliente conectado ');
  s.clients.forEach(function each(client) {
    const mensaje = {
      name: 'Jose',
    };
    client.send(JSON.stringify(mensaje));
  });
});

/*
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
*/
