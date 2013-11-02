module.exports = (sequelize, DataTypes) ->
  return sequelize.define "Car", {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
  }, {
    instanceMethods: {


    }
  }

