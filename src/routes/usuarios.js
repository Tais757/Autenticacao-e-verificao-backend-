const express = require('express');

const usuarioController = require('../controller/UsuarioController');

const router = express.Router();

router.post('/registrar', usuarioController.realizaRegistro);

router.post('/login', usuarioController.realizaLogin);

router.get('/verificar', usuarioController.verifica);

module.exports = router;