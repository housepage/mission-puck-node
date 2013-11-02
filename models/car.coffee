module.exports = (sequelize, DataTypes) ->
  return sequelize.define "Car", {
    make: Sequelize.STRING,
    model: Sequelize.STRING,
    year: Sequelize.INTEGER,
  }, {
    instanceMethods: {


    }
  }

