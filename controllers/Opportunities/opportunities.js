const Sequelize = require("sequelize");
const connection = require("../../database/database");

const Opportunite = connection.define('Opportunite',{
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
    
Opportunite.sync({force: false});
module.exports = Opportunite;