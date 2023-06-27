const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Cursando = require('../models/cursando');
const Aluno = require("../models/aluno");
const Disciplina = require("../models/disciplina");
const asyncHandler = require("express-async-handler");

exports.cursando_lista = asyncHandler(async (req, res, next) => {
    await Cursando.sync();
    await Disciplina.sync();
    await Aluno.sync();

    sequelize.query('select * from cursando as c inner join aluno as a on a.id = c.idAluno inner join disciplina as d on d.id = c.idDisciplina', {
        type: Sequelize.QueryTypes.SELECT,
    }).then((cursando) => {
        res.render('cursando/listagem', { cursando: cursando });
        console.log(cursando);
    }).catch((error) => {
        console.error(error);
    });
});

exports.cursando_cadastrar = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();
    await Aluno.sync();

    res.render('cursando/cadastro', { disciplina: await Disciplina.findAll(), aluno: await Aluno.findAll() });
});

exports.cursando_inserir = asyncHandler(async (req, res, next) => {
    await Cursando.sync();

    try {
        const { data, idDisciplina, idAluno } = req.body;

        if (data, idDisciplina, idAluno) {
            const cursando = await Cursando.create(req.body);
            res.redirect('/cursando/listagem');
        }
    } catch (error) {
        console.error('Erro ao inserir cursando:', error);
        res.status(500).json({ error: 'Erro ao inserir cursando' });
    }
});

exports.cursando_deletar = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.body;
        const cursando = await Cursando.findByPk(id);

        if (cursando) {
            await Cursando.destroy({ where: { id } });
            res.redirect('/cursando/listagem');
        } else {
            console.log('Erro ao deletar cursando');
        }
    } catch (err) {
        console.error('Erro ao deletar cursando:', err);
    }
});

exports.cursando_editando = asyncHandler(async (req, res, next) => {
    await Cursando.sync();
    const cursando = await Cursando.findByPk(req.body.id);
    // let listaDisciplinas = await Disciplina.findAll();
    // let listaEditado = [];

    // for (let i = 0; i < listaDisciplinas.length; i++) {
    //     listaEditado[i] = listaDisciplinas[i].dataValues;

    //     if (listaEditado[i].id == aluno.idDisciplina) {
    //         listaEditado[i].marcado = true;
    //     } else {
    //         listaEditado[i].marcado = false;
    //     }
    // }

    if (cursando) {
        res.render('cursando/edicao', { cursando: cursando.dataValues });
    } else {
        res.render('cursando/listagem');
    }
});

exports.cursando_salvar_edicao = asyncHandler(async (req, res, next) => {
    try {
        const { id, data, idDisciplina, idAluno } = req.body;

        if (id && data && idDisciplina && idAluno) {
            await Cursando.update({ data, idDisciplina, idAluno }, { where: { id } })
            res.redirect('/cursando/listagem');
        } else {
            console.log('Erro ao editar cursando');
        }
    } catch (err) {
        console.error('Erro ao editar cursando:', err);
    }
});