const Chat = require('./chat');

function inserirMensagem(data) {
    var chatObj = new Chat({
            usuario:    data.user_id,
            mensagem:  data.message,
            sala:      data.room
        });

    chatObj.save();
}

// Insere um novo comentario pegando o usuario que postou
Chat.route('retornarMensagens.get', (req, res, next) => {
    const ID_sala = req.query.ID_sala;

    Chat.find({"sala": ID_sala })
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

module.exports = {inserirMensagem , Chat}