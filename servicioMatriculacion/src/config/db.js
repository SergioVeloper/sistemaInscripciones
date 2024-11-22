const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('db_matriculacion', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;

