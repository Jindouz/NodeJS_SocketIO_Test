const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle a new connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle PING message
  socket.on('PING', () => {
    console.log('Received PING, sending PONG');
    socket.emit('PONG');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
