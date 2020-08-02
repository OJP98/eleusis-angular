var server = require('ws').Server;
var s = new server({ port: 8080 });

s.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('Sevidor recibe: ' + message);
    const mensaje = {
      name: 'Jose',
    };
    ws.send(JSON.stringify(mensaje));
  });
});

/*
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});
*/
