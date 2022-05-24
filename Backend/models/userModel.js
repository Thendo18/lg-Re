const { timeStamp } = require('console');
const Sequelize = require('../Connection/db');

const {DataTypes, Model} = require(Sequelize);

class  User extends Model {}

User.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: { 
          type: Sequelize.STRING, 
        allowNull: false 
    },


},
{
    ModelName:"users_table",
    Sequelize,
    tableName:"users_table",
    allowNull:false,
    timeStamp:false
})