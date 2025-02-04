const { WebSocket, WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

let allsocket = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedmsg = JSON.parse(message);


    if (parsedmsg.type === "join") {
      allsocket.push({
        socket,
        room: parsedmsg.payload.roomId,
      })
    }

    if (parsedmsg.type === "chat") {
      let currRoom = null;
      for (let i = 0; i < allsocket.length; i++) {
        if (allsocket[i].socket === socket) {
          currRoom = allsocket[i].room;
        }
      }

      for (let i = 0; i < allsocket.length; i++) {
        if (allsocket[i].room === currRoom) {
          allsocket[i].socket.send(parsedmsg.payload.message);
        }
      }
    }
  })
})

