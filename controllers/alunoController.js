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
    console.log(req.body);

    

    try{
        const aluno = await Aluno.create(req.body);
        res.redirect('/aluno/listagem');
    } catch(err){}
});