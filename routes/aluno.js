const express = require('express');

const aluno_controller = require('../controllers/alunoController');

const route = express.Router();

route.get('/listagem', aluno_controller.aluno_lista);
route.get('/digitar', aluno_controller.aluno_cadastrar);
route.post('/inserir', aluno_controller.aluno_inserir);
route.post('/edicao', aluno_controller.aluno_editando);
route.post('/salvar_edicao', aluno_controller.aluno_salvar_edicao);
route.post('/deletar', aluno_controller.aluno_deletar);

module.exports = route;