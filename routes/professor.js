const express = require('express');

const professor_controller = require('../controllers/professorController');

const route = express.Router();

route.get('/listagem', professor_controller.professor_lista);
route.get('/digitar', professor_controller.professor_cadastrar);
route.post('/inserir', professor_controller.professor_inserir);
route.post('/edicao', professor_controller.professor_editando);
route.post('/salvar_edicao', professor_controller.professor_salvar_edicao);
route.post('/deletar', professor_controller.professor_deletar);

module.exports = route;