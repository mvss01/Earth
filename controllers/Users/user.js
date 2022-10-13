const Sequelize = require("sequelize");
const connection = require("../../database/database");

const User = connection.define('User',{
    firstName:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    type:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    telephone:{
        type: Sequelize.STRING,
        allowNull: true
    },
    description:{
        type: Sequelize.STRING,
        allowNull: true
    },
    location:{
        type: Sequelize.STRING,
        allowNull: true
    },
    token:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
    
User.sync({force: false});
module.exports = User;