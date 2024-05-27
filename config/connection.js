const { Sequelize } = require("sequelize");
const development = require("./config");

const sequelize = new Sequelize(development.database, development.username, development.password, {
    port: development.port,
    host: development.host,
    dialect: development.dialect,
    logging: false
})

try {
    sequelize.authenticate();
    console.log("connect!!")
} catch (error) {
    console.log(error)
}

module.exports = sequelize;