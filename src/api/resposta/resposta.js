const restful = require('node-restful');
const mongoose = restful.mongoose;

const respostaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    descricao: { type: String, require: true },
    oficial: { type: Boolean, require: true, default: false },
    createdAt: { type: Date, require: true, default: Date.now },
    comentario: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario'}],
    likes: { type: Number, default: 0 }
});

respostaSchema.index({ descricao: "text" });

module.exports = restful.model('Resposta', respostaSchema);