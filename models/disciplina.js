const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');

const Disciplina = sequelize.define('Disciplina', {
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey: true
    },
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