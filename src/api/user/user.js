const restful = require('node-restful')

const mongoose = restful.mongoose
const userSchema = new mongoose.Schema({
    nomeReal: { type: String, required: true, text: true },
    nomeVirtual: { type: String, required: true, text: true},
    email: { type: String, required: true, text: true },
    password: { type: String, min: 6, max: 12, required: true },
    tipo: {type: String, required: true, enum: [ "Aluno", "Professor", "Monitor", "Admin"] },
    disciplina: [{type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina'}],
    situacao: { type: String, required: true, enum: [ "Ativo", "Inativo"] },
    createdAt: { type: Date, require: true, default: new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate()) }
})

userSchema.index({nomeReal: 'text', nomeVirtual: 'text', email: 'text' });

module.exports = restful.model('User', userSchema)