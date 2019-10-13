const Comentario = require('./comentario');
const errorHandler = require('../common/errorHandler');

Comentario.methods(['get', 'put', 'delete']);
Comentario.updateOptions({new: true, runValidators: true});
Comentario.after('post', errorHandler).after('put', errorHandler);

// Insere um novo comentario pegando o usuario que postou
Comentario.route('novo_comentario.post', (req, res, next) => {
    var comentarioOBJ = new Comentario({
                                    usuario:    req.decoded._id,
                                    descricao:  req.body.descricao,
                                    tipo:       req.body.tipo
                                    });

    comentarioOBJ.save(function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            return res.json({value});
        }
    });
});

module.exports = Comentario;