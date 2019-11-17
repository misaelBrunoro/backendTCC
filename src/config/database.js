const mongoose = require('mongoose')

// Conexão com o banco local
const url = process.env.MONGOLAB_URI ? process.env.MONGOLAB_URI : 'mongodb://localhost/monitoriatcc';

module.exports = mongoose.connect(url, 
                                    { useNewUrlParser: true ,
                                      useUnifiedTopology: true,
                                      useCreateIndex: true,
                                      useFindAndModify: false });

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'." 
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'"