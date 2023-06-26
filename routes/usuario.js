const express = require('express');

const usuario_controller = require('../controllers/usuarioController');

const route = express.Router();

// route.get('/login', usuario_controller.usuario_login);
route.get('/digitar', usuario_controller.usuario_cadastrar);
route.post('/inserir', usuario_controller.usuario_inserir);

module.exports = route;