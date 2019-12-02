const User = require('./user');
const errorHandler = require('../common/errorHandler');
const bcrypt = require('bcrypt');

User.methods(['get', 'put', 'delete']);
User.updateOptions({new: true, runValidators: true});
User.after('post', errorHandler).after('put', errorHandler);

User.route('current_user.get', (req, res, next) => {
    User.findOne({ email: req.decoded.email })
        .populate('disciplina')
        .exec((error, value) => { 
        if(error) {
            res.status(500).json({erros: [error]});
        } else if (value) {
            const user = { _id: value._id,
                           nomeReal: value.nomeReal,
                           nomeVirtual: value.nomeVirtual,
                           email: value.email,
                           tipo: value.tipo,
                           disciplina: value.disciplina
                        }
            return res.json(user);
        }   
    });
});

User.route('alterar_perfil.post', (req, res, next) => {
    const usuario = req.body || null;
    const email = req.decoded.email;
    const query = {};
    const emailRegex = /\S+@\S+\.\S+/
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12})/;

    if(usuario.nomeReal) {
        query.nomeReal = usuario.nomeReal;
    }
    if(usuario.nomeVirtual) {
        query.nomeVirtual = usuario.nomeVirtual;
    }
    if(usuario.email) {
        if(!usuario.email.match(emailRegex)) {
            return res.status(400).send({errors: ['O e-mail informado está inválido']});
        }
        query.email = usuario.email;
    }
    if(usuario.senhaAtual && usuario.novaSenha) {
        
        if(!usuario.novaSenha.match(passwordRegex)) {
            return res.status(400).send({errors: [ 'Senha precisar ter: uma letra maiúscula, uma letra'+ 
            ' minúscula, um número, um caractere especial(@#$%) e tamanho entre 6-20.']});
        }
        User.findOne({ email }, function (err, user) {
            if (err) {
                return sendErrorsFromDB(res, err);
            } else if (user && bcrypt.compareSync(usuario.senhaAtual, user.password)) {
                const salt = bcrypt.genSaltSync();
                const passwordHash = bcrypt.hashSync(usuario.novaSenha, salt);

                query.password = passwordHash;
               
                updateUser(email, query, res); 
            } else {
                return res.status(400).send({errors: [ 'Senha atual não coincide']});
            }
        })
    } else {
        updateUser(email, query, res);
    }
   
});

function updateUser (email, query, res) {
    User.updateOne({ email }, query, function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        }
        return res.json(value);
    });
}

User.route('search_users.get', (req, res, next) => {
    User.find({tipo: req.query.tipo})
        .populate('disciplina') 
        .exec((error, value) => { 
            if(error) {
                res.status(500).json({erros: [error]});
            } else if (value) {
                return res.json(value);
            }
        });
});

User.route('ativar_user', (req, res, next) => {
    User.updateOne({_id: req.query._id}, {situacao: req.query.ativo}, function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        }
        return res.json(value);
    });
});

User.route('user_porID', (req, res, next) => {
    User.findOne({_id: req.query._id}, function(error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        } 
        return res.json(value);
    });
});

User.route('vincular_disciplina', (req, res, next) => { 
    if (req.query.vincular == 'Adicionar') {
        User.updateOne({_id: req.query.user_id}, { $push: { disciplina: req.query._id } }, function (error, value) {
            if(error) {
                res.status(500).json({erros: [error]});
            }
            return res.json(value);
        });
    } else {
        User.updateOne({_id: req.query.user_id}, { $pull: { disciplina: req.query._id } }, function (error, value) {
            if(error) {
                res.status(500).json({erros: [error]});
            }
            return res.json(value);
        });
    }
});

User.route('tornar_monitor', (req, res, next) => {
    const query = {};
    query.tipo = req.query.tipo;

    if(req.query.tipo == 'Aluno') {
        query.$set = { disciplina: []};
    }

    User.updateOne({_id: req.query._id}, query, function (error, value) {
        if(error) {
            res.status(500).json({erros: [error]});
        }
        return res.json(value);
    });
});

User.route('filtrar_user', (req, res, next) => { 
    const query = {};

    if (req.body.texto){
        query.$text = { $search: req.body.texto };
    }
    query.tipo = req.body.tipo;
    User.find(query)
        .exec((error, value) => {
            if(error) {
                res.status(500).json({erros: [error]});
            } else {
                return res.json(value);
            }
        });
});

module.exports = User;