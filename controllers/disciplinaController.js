const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Disciplina = require("../models/disciplina");
const asyncHandler = require("express-async-handler");
const Professor = require("../models/professor");

exports.disciplina_lista = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();
    res.render('disciplina/listagem', { disciplina: await Disciplina.findAll() });
});

exports.disciplina_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('disciplina/cadastro', { professor: await Professor.findAll() });
});

exports.disciplina_inserir = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();

    try {
        console.log(req.body);
        const { nome, cargaHoraria, idProfessor } = req.body;

        if (nome && cargaHoraria && idProfessor) {
            const disciplina = await Disciplina.create(req.body);
            res.redirect('/disciplina/listagem');
        } else {
            console.log("Erro ao inserir disciplina");
        }
    } catch (err) {
        console.error('Erro ao inserir disciplina:', err);
    }
});

exports.disciplina_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const disciplina = await Disciplina.findByPk(id);

        if (disciplina) {
            await Disciplina.destroy({ where: { id } });
            res.redirect('/disciplina/listagem');
        } else {
            console.log('Erro ao deletar disciplina');
        }
    } catch (err) {
        console.error('Erro ao deletar disciplina:', err);
    }
});

exports.disciplina_editando = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();
    const disciplina = await Disciplina.findByPk(req.body.id);
    let listaProfessores = await Professor.findAll();
    let listaEditado = [];

    for (let i = 0; i < listaProfessores.length; i++) {
        listaEditado[i] = listaProfessores[i].dataValues;

        if (listaEditado[i].id == disciplina.idProfessor) {
            listaEditado[i].marcado = true;
        } else {
            listaEditado[i].marcado = false;
        }
    }

    console.log(listaEditado);

    if (disciplina) {
        res.render('disciplina/edicao', { disciplina: disciplina.dataValues, professores: listaEditado });
    } else {
        res.render('disciplina/listagem');
    }
});

exports.disciplina_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, nome, cargaHoraria, idProfessor } = req.body;
        if (id && nome && cargaHoraria && idProfessor) {
            await Disciplina.update({ nome, cargaHoraria, idProfessor }, { where: { id } })
            res.redirect('/disciplina/listagem');
        } else {
            console.log('Erro ao editar disciplina');
        }
    } catch (err) {
        console.error('Erro ao editar disciplina:', err);
    }
});