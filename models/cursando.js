const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');
const Disciplina = require('./disciplina');
const Aluno = require('./aluno');

const Cursando = sequelize.define('Cursando', {
    data: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Cursando'
});

Disciplina.hasOne(Cursando, {
    foreignKey: 'idDisciplina',
    allowNull: false
});

Aluno.hasOne(Cursando, {
    foreignKey: 'idAluno',
    allowNull: false
});

module.exports = Cursando;