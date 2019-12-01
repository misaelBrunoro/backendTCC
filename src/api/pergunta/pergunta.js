const restful = require('node-restful');
const mongoose = restful.mongoose;

const perguntaSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    titulo: { type: String, required: true, text: true },
    descricao: { type: String, required: true, text: true },
    resolvido: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()) },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
    resposta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resposta'}],
    likes: { type: Number, default: 0 }
});

perguntaSchema.index({titulo: 'text', descricao: 'text' });

module.exports = restful.model('Pergunta', perguntaSchema);
