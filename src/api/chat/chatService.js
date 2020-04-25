const Chat = require('./chat');

function inserirMensagem(data) {
    var chatObj = new Chat({
            usuario:    data.user_id,
            mensagem:  data.message,
            sala:      data.room
        });

    chatObj.save();
}

// Busca mensagens filtradas
Chat.route('retornarMensagensFiltradas.post', (req, res, next) => {
    const ID_sala = req.query.ID_sala;
    const query = {};

    query.sala = ID_sala;

    if (req.body.texto) {
        query.$text = { $search: req.body.texto };
    }
    
    Chat.find(query)
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