const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');
const Disciplina = require('./disciplina');

const Aluno = sequelize.define('Aluno', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Aluno'
});

Disciplina.hasOne(Aluno, {
    foreignKey: 'idDisciplina',
    allowNull: false
});

module.exports = Aluno;