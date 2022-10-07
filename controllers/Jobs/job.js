const Sequelize = require("sequelize");
const connection = require("../../database/database");

const Job = connection.define('Job',{
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
    }
});
    
Job.sync({force: false});
module.exports = Job;