const mongoose = require('mongoose')

// Conexão com o banco local
module.exports = mongoose.connect('mongodb://localhost/monitoriatcc', 
                                    { useNewUrlParser: true ,
                                      useUnifiedTopology: true,
                                      useCreateIndex: true,
                                      useFindAndModify: false });
