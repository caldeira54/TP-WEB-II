const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Professor = require("../models/professor");
const asyncHandler = require("express-async-handler");

exports.professor_lista = asyncHandler(async (req, res, next) => {
    await Professor.sync();
    res.render('professor/listagem', { professor: await Professor.findAll() });
});

exports.professor_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('professor/cadastro');
});

exports.professor_inserir = asyncHandler(async (req, res, next) => {
    await Professor.sync();

    try {
        const { nome, salario, endereco } = req.body;

        if (nome && salario && endereco) {
            const professor = await Professor.create(req.body);
            res.redirect('/professor/listagem');
        } else {
            console.log("Erro ao inserir professor");
        }
    } catch (err) {
        console.error('Erro ao inserir professor:', err);
    }
});

exports.professor_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const professor = await Professor.findByPk(id);

        if (professor) {
            await Professor.destroy({ where: { id } });
            res.redirect('/professor/listagem');
        } else {
            console.log('Erro ao deletar professor');
        }
    } catch (err) {
        console.error('Erro ao deletar professor:', err);
    }
});

exports.professor_editando = asyncHandler(async (req, res, next) => {
    await Professor.sync();
    const professor = await Professor.findByPk(req.body.id);

    if (professor) {
        res.render('professor/edicao', { professor: professor.dataValues });
    } else {
        res.render('professor/listagem');
    }
});

exports.professor_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, nome, salario, endereco } = req.body;
        
        if (id && nome && salario, endereco) {
            await Professor.update({ nome, salario, endereco }, { where: { id } })
            res.redirect('/professor/listagem');
        } else {
            console.log('Erro ao editar professor');
        }
    } catch (err) {
        console.error('Erro ao editar professor:', err);
    }
});