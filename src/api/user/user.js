const restful = require('node-restful')

const mongoose = restful.mongoose
const userSchema = new mongoose.Schema({
    nomeReal: { type: String, required: true },
    nomeVirtual: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, min: 6, max: 12, required: true },
    tipo: {type: String, required: true, enum: [ "Aluno", "Professor", "Monitor", "Admin"] },
    disciplina: [{type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina'}],
    situacao: { type: String, required: true, enum: [ "Ativo", "Inativo"] }
})

module.exports = restful.model('User', userSchema)