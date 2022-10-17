const Sequelize = require("sequelize");
const connection = require("../../database/database");


const Favorite = connection.define('Favorite',{
    jobId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userEmail:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    jobName:{
        type: Sequelize.STRING,
        allowNull: false, 
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    availability:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false
    },
    company:{
        type: Sequelize.STRING,
        allowNull: false
    },
    target:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    city:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    state:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    workload:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Favorite.sync({force: false});
module.exports = Favorite;