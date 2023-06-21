const express = require('express');

const disciplina_controller = require('../controllers/disciplinaController');

const route = express.Router();

route.get('/listagem', disciplina_controller.disciplina_lista);
route.get('/digitar', disciplina_controller.disciplina_cadastrar);
route.post('/inserir', disciplina_controller.disciplina_inserir);
route.post('/edicao', disciplina_controller.disciplina_editando);
route.post('/salvar_edicao', disciplina_controller.disciplina_salvar_edicao);
route.post('/deletar', disciplina_controller.disciplina_deletar);

module.exports = route;