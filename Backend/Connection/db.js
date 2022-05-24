const sequelize = require('sequelize');

// const sequelize= newSequelize('mysql://root:@localhost:3306/loginRegister');

const sequelize= new Sequelize('loginregister', 'root', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0, // change this to zero
})

module.exports = sequelize;