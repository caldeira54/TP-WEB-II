const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');

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

module.exports = Aluno;