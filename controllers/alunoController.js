const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Aluno = require("../models/aluno");
const asyncHandler = require("express-async-handler");

exports.aluno_lista = asyncHandler(async (req, res, next) => {
    await Aluno.sync();
    res.render('aluno/listagem', { aluno: await Aluno.findAll() });
});

exports.aluno_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('aluno/cadastro');
});

exports.aluno_inserir = asyncHandler(async (req, res, next) => {
    await Aluno.sync();

    try {
        const { nome, idade, endereco, idDisciplina } = req.body;

        if (nome && idade && endereco && idDisciplina) {
            const aluno = await Aluno.create(req.body);
            res.redirect('/aluno/listagem');
        } else {
            console.log("Erro ao inserir aluno");
        }
    } catch (err) {
        console.error("Erro ao inserir aluno", err);
    }
});

exports.aluno_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const aluno = await Aluno.findByPk(id);

        if (aluno) {
            await Aluno.destroy({ where: { id } });
            res.redirect('/aluno/listagem');
        } else {
            console.log('Erro ao deletar aluno');
        }
    } catch (err) {
        console.error('Erro ao deletar aluno:', err);
    }
});

exports.aluno_editando = asyncHandler(async (req, res, next) => {
    await Aluno.sync();
    const aluno = await Aluno.findByPk(req.body.id);

    if (aluno) {
        res.render('aluno/edicao', { aluno: aluno.dataValues });
    } else {
        res.render('aluno/listagem');
    }
});

exports.aluno_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, nome, idade, endereco, idDisciplina } = req.body;

        if (id && nome && idade && endereco && idDisciplina) {
            await Aluno.update({ nome, idade, endereco, idDisciplina }, { where: { id } })
            res.redirect('/aluno/listagem');
        } else {
            console.log('Erro ao editar aluno');
        }
    } catch (err) {
        console.error('Erro ao editar aluno:', err);
    }
});