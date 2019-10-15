const restful = require('node-restful');
const mongoose = restful.mongoose;

const comentarioSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    descricao: { type: String, required: true },
    tipo: { type: String, required: true},
    createdAt: { type: Date, required: true, default: Date.now },
});

module.exports = restful.model('Comentario', comentarioSchema);
