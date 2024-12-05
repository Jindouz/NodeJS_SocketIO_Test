const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
// const io = new Server(server);
const io = new Server(server, {
    cors: {
    //   origin: "http://localhost:3000",
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('PING', () => {
    console.log('Received PING, sending PONG');
    socket.emit('PONG');
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
