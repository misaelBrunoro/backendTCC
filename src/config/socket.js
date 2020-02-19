module.exports = function(app) {
    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
        socket.on('join', function(data) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: 'has joined this room.'});
        });
        
        socket.on('leave', function(data) {
            socket.broadcast.to(data.room).emit('left room', {user: data.user, message: 'has left this room.'});
            socket.leave(data.room);
        }); 

        socket.on('message', function(data) {
            io.in(data.room).emit('new message', {user: data.user, message: data.message});
        }); 
    });
}