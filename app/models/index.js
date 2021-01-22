const dbConfig = require("../config/db.config.js");

const dbEnv = process.env.NODE_ENV == 'test' ? dbConfig.tests : dbConfig.dev;
console.log('Database: ', dbEnv.DB);

const Sequelize = require("sequelize");
const sequelizeConfig = new Sequelize(dbEnv.DB, dbEnv.USER, dbEnv.PASSWORD, {
    host: dbEnv.HOST,
    dialect: dbConfig.dev.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelizeConfig = sequelizeConfig;

db.client = require("./client.model.js")(sequelizeConfig, Sequelize);
db.dependent = require("./dependent.model.js")(sequelizeConfig, Sequelize);

// Relation between models
db.client.hasMany(db.dependent, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
        allowNull: false
    }
});
db.dependent.belongsTo(db.client);

module.exports = db;