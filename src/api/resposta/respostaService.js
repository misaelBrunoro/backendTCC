const Resposta = require('./resposta');
const errorHandler = require('../common/errorHandler');

Resposta.methods(['get', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});
Resposta.after('post', errorHandler).after('put', errorHandler);

// Insere uma nova resposta pegando o usuario que postou
Resposta.route('nova_resposta.post', (req, res, next) => {
    var respostaOBJ = new Resposta({
                                    usuario:    req.decoded._id,
                                    descricao:  req.body.descricao
                                    });

    respostaOBJ.save(function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            return res.json({value});
        }
    });
});

module.exports = Resposta;