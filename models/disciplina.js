const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');
const Professor = require('./professor');
const Aluno = require('./aluno');

const Disciplina = sequelize.define('Disciplina', {
    materia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Disciplina'
});

Professor.hasOne(Disciplina, {
    foreignKey: 'idProfessor',
    allowNull: false
});

module.exports = Disciplina;