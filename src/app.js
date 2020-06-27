const express = require('express');

const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('./db/config');

const app = express();

/**
 * Permissão de acesso ao web services / endpoints.
 */
app.use(cors());

app.use(logger('dev'));

/**
 * Define que os dados recebidos no corpo da requisição devem estar 
 * no formato JSON
 */
app.use(bodyParser.json());

app.use('/', require('./routes/usuarios'));

module.exports = app;