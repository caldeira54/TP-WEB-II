const express = require('express');

const cursando_controller = require('../controllers/cursandoController');

const route = express.Router();

route.get('/listagem', cursando_controller.cursando_lista);
route.get('/digitar', cursando_controller.cursando_cadastrar);
route.post('/inserir', cursando_controller.cursando_inserir);
route.post('/edicao', cursando_controller.cursando_editando);
route.post('/salvar_edicao', cursando_controller.cursando_salvar_edicao);
route.post('/deletar', cursando_controller.cursando_deletar);

module.exports = route;