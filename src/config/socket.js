const inserirMensagem = require('../api/chat/chatService').inserirMensagem;

module.exports = function(app) {
    var io = require('socket.io').listen(app);

    io.sockets.on('connection', function (socket) {
        socket.on('join', function(data) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('novo usuário entrou', {user_id: data.user_id, user: data.user, message: 'entrou na sala.'});
        });
        
        socket.on('leave', function(data) {
            socket.broadcast.to(data.room).emit('saiu da sala', {user_id: data.user_id, user: data.user, message: 'saiu dessa sala.'});
            socket.leave(data.room);
        }); 

        socket.on('message', function(data) {
            io.in(data.room).emit('nova mensagem', {user_id: data.user_id, user: data.user, message: data.message});
            inserirMensagem(data);
        }); 
    });
}