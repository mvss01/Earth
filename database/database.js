const Sequelize = require('sequelize');

const connection = new Sequelize('earth', 'root', '2m0m2m1m',{
    host: /*'portalsims.com'*/ 'localhost',
    dialect: 'mysql',
              timezone: '-03:00',
             
});

module.exports = connection;
    