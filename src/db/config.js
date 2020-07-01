const mongoose = require('mongoose');

const URI_DB = process.env.MONGODB_URI || 'mongodb://localhost/usuarios_login';

mongoose
    .connect(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('Mongoose conectado'))
    .catch(erro => console.log(erro));