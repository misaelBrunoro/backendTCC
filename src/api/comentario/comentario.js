const restful = require('node-restful');
const mongoose = restful.mongoose;

const comentarioSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    descricao: { type: String, require: true },
    tipo: { type: String, require: true},
    createdAt: { type: Date, require: true, default: Date.now },
});

module.exports = restful.model('Comentario', comentarioSchema);
