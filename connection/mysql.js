const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:123456@localhost:3306/bdescola', {
    dialect: 'mysql'
})

module.exports = sequelize;