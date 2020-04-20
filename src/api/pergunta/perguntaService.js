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
    Pergunta.find({_id: req.query.id})
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

// Realizar busca com base nos filstros
Pergunta.route('pagination.post', (req, res, next) => {
    const filter = req.body || null;
    const page = parseInt(req.query.page) || 1;
    const query = {};

    if(filter.texto) {
        query.$text = { $search: filter.texto };
    }
    if(filter.disciplina) {
        query.disciplina = filter.disciplina;
    }
    if(filter.dataPublicacao) {
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