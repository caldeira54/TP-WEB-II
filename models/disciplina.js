const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');

const Disciplina = sequelize.define('Disciplina', {
    nome: {
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

module.exports = Disciplina;