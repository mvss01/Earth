const Sequelize = require("sequelize");
const connection = require("../../database/database");

const Opportunite = connection.define('Opportunite',{
    userEmail:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    jobId:{
        type: Sequelize.INTEGER
    }
});
    
Opportunite.sync({force: false});
module.exports = Opportunite;