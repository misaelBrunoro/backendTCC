// Porta de escuta
const port = process.env.PORT || 80;

// Dependencias
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const cors = require('./cors');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(cors);

var app = server.listen(port, function() {
    console.log(`Backend is running in port ${port}.`);
});

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    console.log('new connection made.')

    socket.on('join', function(data) {
        socket.join(data.room);
        console.log(data.user + 'joined the room: '+ data.room);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    }); 
});

module.exports = server;