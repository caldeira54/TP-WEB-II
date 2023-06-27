const { text } = require("body-parser");
const { Sequelize } = require('sequelize');
const sequelize = require('../connection/mysql');
const Disciplina = require("../models/disciplina");
const asyncHandler = require("express-async-handler");
const Professor = require("../models/professor");

exports.disciplina_lista = asyncHandler(async (req, res, next) => {
    // await Disciplina.sync();
    // res.render('disciplina/listagem', { disciplina: await Disciplina.findAll() });

    await Disciplina.sync();
    await Professor.sync();

    sequelize.query('select * from disciplina as d inner join professor as p on d.idProfessor = p.id;', {
        type: Sequelize.QueryTypes.SELECT,
    }).then((disciplina) => {
        res.render('disciplina/listagem', { disciplina: disciplina });
        console.log(disciplina);
    }).catch((error) => {
        console.error(error);
    });
});

exports.disciplina_cadastrar = asyncHandler(async (req, res, next) => {
    res.render('disciplina/cadastro', { professor: await Professor.findAll() });
});

exports.disciplina_inserir = asyncHandler(async (req, res, next) => {
    await Disciplina.sync();

    try {
        console.log(req.body);
        const { materia, cargaHoraria, idProfessor } = req.body;

        if (materia && cargaHoraria && idProfessor) {
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
        const { id, materia, cargaHoraria, idProfessor } = req.body;
        if (id && materia && cargaHoraria && idProfessor) {
            await Disciplina.update({ materia, cargaHoraria, idProfessor }, { where: { id } })
            res.redirect('/disciplina/listagem');
        } else {
            console.log('Erro ao editar disciplina');
        }
    } catch (err) {
        console.error('Erro ao editar disciplina:', err);
    }
});