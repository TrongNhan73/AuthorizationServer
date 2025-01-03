const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('authorizationserver', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: (msg) => console.log(msg)
    // logging: false
});


const connection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = {
    connection
}