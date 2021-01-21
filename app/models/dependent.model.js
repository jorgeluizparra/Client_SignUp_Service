module.exports = (sequelizeConfig, Sequelize) => {
    const Dependent = sequelizeConfig.define("dependent", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        age: {
            type: Sequelize.STRING,
            allowNull: false
        },
        relation: {
            type: Sequelize.STRING ,
            allowNull: false
        }
    });
  
    return Dependent;
};