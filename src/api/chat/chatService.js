const Chat = require('./chat');

function inserirMensagem(data) {
    var chatObj = new Chat({
            usuario:    data.user_id,
            mensagem:  data.menssage,
            sala:      data.room_id
        });

    chatObj.save();
}

// Insere um novo comentario pegando o usuario que postou
Chat.route('retorna_mensagens.get', (req, res, next) => {
    const ID_sala = req.query.ID_sala;

    Chat.find({"_id": ID_sala })
        .populate({
            path: 'usuario',
            select: '_id nomeReal nomeVirtual email'
        })
        .exec((error, value) => {
            if(error) {
                res.status(500).json({erros: [error]});
            } else {
                return res.json( value );
            }
        });
});