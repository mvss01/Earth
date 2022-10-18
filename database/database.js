const Sequelize = require('sequelize');

const connection = new Sequelize('earth', 'root', '',{
    host: /*'portalsims.com'*/ 'localhost',
    dialect: 'mysql',
              timezone: '-03:00',
             
});

module.exports = connection;
    