module.exports = (sequelizeConfig, Sequelize) => {
    const Client = sequelizeConfig.define("client", {
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING ,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING ,
            allowNull: false
        }
    });
  
    return Client;
};