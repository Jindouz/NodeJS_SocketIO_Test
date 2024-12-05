const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const messages = []; // Array to store the last 50 messages

// Serve the static files
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send the last 50 messages to the newly connected client
  socket.emit('init', messages);

  // Handle incoming messages
  socket.on('message', (msg) => {
    const message = { id: socket.id, text: msg, timestamp: new Date() };
    messages.push(message);

    // Limit the messages array to the last 50 messages
    if (messages.length > 30) {
      messages.shift();
    }

    // Broadcast the message to all clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
