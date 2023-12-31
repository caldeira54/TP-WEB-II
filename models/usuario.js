const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysql');

const Usuario = sequelize.define('Usuario', {
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Usuario'
});

module.exports = Usuario;