const WebSocket = require('ws');
const server = require('http').createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
});
