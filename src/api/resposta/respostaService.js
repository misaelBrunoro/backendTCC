const Resposta = require('./resposta');
const Pergunta = require('../pergunta/pergunta');
const errorHandler = require('../common/errorHandler');
const paginate = require('jw-paginate');

Resposta.methods(['get', 'put', 'delete']);
Resposta.updateOptions({new: true, runValidators: true});
Resposta.after('post', errorHandler).after('put', errorHandler);

// Insere uma nova resposta pegando o usuario que postou
Resposta.route('nova_resposta.post', (req, res, next) => {
    const ID_pergunta = req.query.ID_pergunta;

    var respostaOBJ = new Resposta({
                                    usuario:    req.decoded._id,
                                    descricao:  req.body.descricao
                                    });

    respostaOBJ.save(function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            Pergunta.updateOne(
                            { _id: ID_pergunta }, { $push: { resposta: value._id } },
                            function (error) {
                                if(error) {
                                    res.status(500).json({erros: [error]});
                                }
                            });
            return res.json({value});
        }
    });
});

// Busca uma pergunta e suas respostas
Resposta.route('retorna_respostas.get', (req, res, next) => {
    const ID_pergunta = req.query.ID_pergunta;
    const page = parseInt(req.query.page) || 1;

    Pergunta.find({_id: ID_pergunta})
            .populate({
                        path: 'resposta',
                        populate: { path: 'usuario',
                                select: '_id nomeReal nomeVirtual email'
                        }
                    })
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    return res.json(paginateItems(value[0].resposta, page));
                }
            });
})

Resposta.route('oficializar', (req, res, next) => {
    const ID_pergunta = req.query.ID_pergunta;
    const ID_resposta = req.query.ID_resposta;
    const ID_resposta_anterior = req.query.ID_resposta_anterior;
    Pergunta.updateOne(
                    { _id: ID_pergunta }, {resolvido: true},
                    function (error) {
                        if(error) {
                            res.status(500).json({erros: [error]});
                        } else {
                            if (ID_resposta_anterior !== 'null') {
                                Resposta.updateOne(
                                    { _id: ID_resposta_anterior }, { oficial: false },
                                    function (error) {
                                        if(error) {
                                            res.status(500).json({erros: [error]});
                                        }
                                        Resposta.updateOne(
                                            { _id: ID_resposta }, { oficial: true },
                                            function (error) {
                                                if(error) {
                                                    res.status(500).json({erros: [error]});
                                                }
                                        });
                                    });
                            } else {
                                Resposta.updateOne(
                                    { _id: ID_resposta }, { oficial: true },
                                    function (error) {
                                        if(error) {
                                            res.status(500).json({erros: [error]});
                                        }
                                });
                            }
                            
                        }
        return res.json({value: "Sucesso"});
    });
});

function paginateItems(value, page) {
    // Paginação
    const items = value;
    
    const pageSize = 5;

    const pager = paginate(items.length, page, pageSize);

    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    return {pager, pageOfItems};
}

module.exports = Resposta;