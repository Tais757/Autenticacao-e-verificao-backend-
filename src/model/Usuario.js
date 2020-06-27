const mongoose = require('mongoose');

const esquema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

const Usuario = mongoose.model('Usuario', esquema);

module.exports = Usuario;