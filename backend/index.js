const connectToMongo = require('./db');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
var cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;

const server = http.createServer(app);

// Create web socket server
const io = new Server(server, {
    cors: {
        origins: 'http://localhost:*',
    },
});

// Enable CORS in the express app
app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
    // Get message from a client and broadcast it to all
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/news', require('./routes/news'))

server.listen(port, () => {
    console.log(`Backend Server listening at http://localhost:${port}`)
})