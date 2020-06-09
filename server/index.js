const WebSocket = require("ws");
const http = require("http");

const serverHttp = http.createServer();

const server = new WebSocket.Server({
  server: serverHttp
});

server.on("connection", ws => {
  countOnlineUsers();
  ws.on("message", message => {
    console.log(message);
    let inputMessage = JSON.parse(message);
    if (inputMessage.messageType === "requestOnlineUsers") {
      countOnlineUsers();
    } else {
      server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  });
});

function countOnlineUsers() {
  var i = 0;
  server.clients.forEach(client => {
    i++;
  });
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ messageType: "countUsers", value: i }));
    }
  });
}

serverHttp.listen(3001);
