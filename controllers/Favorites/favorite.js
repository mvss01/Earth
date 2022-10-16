const Sequelize = require("sequelize");
const connection = require("../../database/database");


const Favorite = connection.define('Favorite',{
    userEmail:{
        type: Sequelize.TEXT,
        allowNull: true
    },
    jobId:{
        type: Sequelize.INTEGER
    }
});

Favorite.sync({force: false});
module.exports = Favorite;