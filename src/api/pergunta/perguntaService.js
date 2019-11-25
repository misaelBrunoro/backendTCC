const Pergunta = require('./pergunta');
const Disciplina = require('../disciplina/disciplina')
const paginate = require('jw-paginate');

const errorHandler = require('../common/errorHandler');

Pergunta.methods(['get', 'put', 'delete']);
Pergunta.updateOptions({new: true, runValidators: true});
Pergunta.after('post', errorHandler).after('put', errorHandler);

// Insere uma nova pergunta pegando o usuario que postou
Pergunta.route('nova_pergunta.post', (req, res, next) => {
    var perguntaOBJ = new Pergunta({
                                    usuario:    req.decoded._id, 
                                    titulo:     req.body.titulo,
                                    descricao:  req.body.descricao,
                                    disciplina: req.body.disciplina
                                    });

    perguntaOBJ.save(function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
            return res.json({value});
        }
    });
});

// Retorna uma pergunta e sua resposta oficial buscando pelo seu ID
Pergunta.route('detalhes.get', (req, res, next) => { 
    const ID = req.query.id;
    
    Pergunta.find({_id: ID})
            .populate({
                path: 'resposta',
                match: { oficial: true},
                populate: { path: 'usuario',
                            select: '_id nomeReal nomeVirtual email'
                        },
            })    
            .populate({ path: 'usuario',
                        select: '_id nomeReal nomeVirtual email'
                    })
            .populate('disciplina')        
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    return res.json(value);
                }
            });
});

// Retorna um array contendo os dados para serem mostrados nos graficos
Pergunta.route('retornar_dados', (req, res, next) => {
    let arrayRetorno = [];

    Disciplina.find( )
              .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    value.forEach( element => {
                        Pergunta.find({disciplina: element._id})
                                .exec((error, value) => {
                                    if(error) {
                                        res.status(500).json({erros: [error]});
                                    } else {                               
                                        var objRetorno = {
                                            disciplina: element.nome,
                                            quantidade: 0,
                                            respondidas: 0,
                                            naoRespondidas: 0
                                        }
                                        value.forEach( pergunta => {
                                            if(pergunta.resolvido) {
                                                objRetorno.respondidas++;
                                            } else {
                                                objRetorno.naoRespondidas++;
                                            }
                                        });
                                        objRetorno.quantidade = value.length;
                                        arrayRetorno.push(objRetorno);                              
                                    }
                                });
                    });    
                    return res.json(arrayRetorno);                  
                }
            });
});


// Retorna uma pergunta e sua resposta oficial buscando pelo seu ID
Pergunta.route('getByID.get', (req, res, next) => { 
    const ID = req.query.id;
    
    Pergunta.find({_id: ID})            
            .populate({ path: 'usuario',
                        select: '_id nomeReal nomeVirtual email'
                    })
            .populate('disciplina')        
            .exec((error, value) => {
                if(error) {
                    res.status(500).json({erros: [error]});
                } else {
                    return res.json(value);
                }
            });
});

// TODO montar objeto de busca por data
Pergunta.route('pagination.post', (req, res, next) => {
    const filter = req.body || null;
    const page = parseInt(req.query.page) || 1;
    const query = {};
    
    var aggregate = {};

    if(filter.texto) {
        query.$text = { $search: filter.texto };
        query.$text = { $search: filter.texto };
    }
    if(filter.disciplina) {
        query.disciplina = filter.disciplina;
    }
    if(filter.dataPublicacao) {
        var date = new Date(filter.dataPublicacao);
        query.createdAt = filter.dataPublicacao;
    }
    if(filter.minhasPerguntas) {
        query.usuario = req.decoded._id;
    }
    if(filter.naoRespondidas) {
        query.resolvido = false;
    }
    if(filter.respondidas) {
        query.resolvido = true;
    }
    Pergunta.find(query)
        .sort({_id:-1})  
        .populate('disciplina')
        .populate({ path: 'usuario',
                    select: '_id nomeReal nomeVirtual email'
                })
        .exec((error, value) => {
            if(error) {
                res.status(500).json({erros: [error]});
            } else {
                return res.json(paginateItems(value, page));
            }
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

module.exports = Pergunta;