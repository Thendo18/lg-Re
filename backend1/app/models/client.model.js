const Sequelize = require('sequelize');
const DataTypes = Sequelize;
const sequelizeConnection = require("../../config/db.config.js");

    const Clients = sequelizeConnection.define("users", {
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      usertype: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: Sequelize.STRING
      },

      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at'
       },
      
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at'
      },

    });


    module.exports = Clients;
