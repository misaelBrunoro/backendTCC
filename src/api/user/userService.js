const User = require('./user');
const errorHandler = require('../common/errorHandler');

User.methods(['get', 'put', 'delete']);
User.updateOptions({new: true, runValidators: true});
User.after('post', errorHandler).after('put', errorHandler);

User.route('current_user.get', (req, res, next) => {
    const email = req.decoded.email;
    User.findOne({ email })
        .populate('disciplina')
        .exec((error, value) => { 
        if(error) {
            res.status(500).json({erros: [error]});
        } else {
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

module.exports = User;