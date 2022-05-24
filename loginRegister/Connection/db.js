const sequelize = require('sequelize');

// const sequelize= newSequelize('mysql://root:@localhost:3306/loginRegister');

const sequelize= new sequelize('loginRegister', 'root', 'password', {
    host: '127.0.0.1',
    dialect: 'mysql',

})

module.exports = sequelize;