const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:c3f6a1abmtf@localhost:3306/bdescola', {
    dialect: 'mysql'
})

module.exports = sequelize;