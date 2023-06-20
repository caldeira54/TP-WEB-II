const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Disciplina = require("../models/disciplina");
const asyncHandler = require("express-async-handler");

exports.disciplina_lista = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();
    res.render('disciplina/listagem', { disciplina: await Disciplina.findAll() });
});

exports.disciplina_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('disciplina/cadastro');
});

exports.disciplina_inserir = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();
    const disciplina = await Disciplina.create(req.body);
    res.redirect('/disciplina');
});