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
    country:{
        type: Sequelize.STRING,
        allowNull: true
    },
    state:{
        type: Sequelize.STRING,
        allowNull: true
    },
    city:{
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