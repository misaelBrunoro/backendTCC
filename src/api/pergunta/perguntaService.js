const Pergunta = require('./pergunta');
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

// Busca uma pergunta e suas respostas por ID
Pergunta.route('buscarPorID.get', (req, res, next) => {
    const ID = req.query.id;
    const page = parseInt(req.query.page) || 1;

    Pergunta.find({_id: ID})
            .populate({
                        path: 'usuario',
                        select: '_id nomeReal nomeVirtual email'
                    })
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

// Retorna uma pergunta e sua resposta oficial buscando pelo seu ID
Pergunta.route('detalhes.get', (req, res, next) => { 
    const ID = req.query.id;
    
    Pergunta.find({_id: ID})
            .populate({
                path: 'resposta',
                match: { oficial: true},
                populate: { path: 'usuario',
                            select: '_id nomeReal nomeVirtual email'
                        }
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

// TODO montar objeto de busca por data
Pergunta.route('pagination.post', (req, res, next) => {
    const filter = req.body || null;
    const page = parseInt(req.query.page) || 1;
    const query = {};

    if(filter.texto) {
        query.$text = { $search: filter.texto };
        query.$text = { $search: filter.texto };
    }
    if(filter.disciplina) {
        query.disciplina = filter.disciplina;
    }
    if(filter.dataPublicacao) {
        query.createdAt =  filter.dataPublicacao;
    }
    
    Pergunta.find(query)
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