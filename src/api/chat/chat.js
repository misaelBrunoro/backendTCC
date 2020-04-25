const restful = require('node-restful');
const mongoose = restful.mongoose;

const chatSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mensagem: { type: String, required: true },
    sala: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
    createdAt: { type: Date, require: true, default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()) }
});

chatSchema.index({mensagem: 'text'});

module.exports = restful.model('Chat', chatSchema);
