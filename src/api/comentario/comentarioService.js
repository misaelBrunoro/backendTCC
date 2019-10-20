const Comentario = require('./comentario');
const errorHandler = require('../common/errorHandler');
const Resposta = require('../resposta/resposta');

Comentario.methods(['get', 'put', 'delete']);
Comentario.updateOptions({new: true, runValidators: true});
Comentario.after('post', errorHandler).after('put', errorHandler);

// Insere um novo comentario pegando o usuario que postou
Comentario.route('novo_comentario.post', (req, res, next) => {
    const ID_resposta = req.query.ID_resposta;

    var comentarioOBJ = new Comentario({
                                    usuario:    req.decoded._id,
                                    descricao:  req.body.descricao,
                                    tipo:       req.body.tipo
                                    });
        comentarioOBJ.save(function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            Resposta.updateOne(
                            { _id: ID_resposta }, { $push: { comentario: value._id } },
                            function (error) {
                                if(error) {
                                    res.status(500).json({erros: [error]});
                                }
                            });
            return res.json({value});
        }
    });
});

// Insere um novo comentario pegando o usuario que postou
Comentario.route('retorna_comentarios.get', (req, res, next) => {
    const ID_resposta = req.query.ID_resposta;

    Resposta.find( {"_id": ID_resposta})
            .populate({
                path: 'comentario',
                populate: { path: 'usuario',
                        select: '_id nomeReal nomeVirtual email'
                }
            })
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    return res.json( value[0].comentario );
                }
            });
});

module.exports = Comentario;