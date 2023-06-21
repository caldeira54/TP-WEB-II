const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');

const Professor = sequelize.define('Professor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salario: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Professor'
});

module.exports = Professor;