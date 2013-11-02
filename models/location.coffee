module.exports = (sequelize, DataTypes) ->
  return sequelize.define "Location", {
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    timestamp: Sequelize.DATE
  }, {
    instanceMethods: {


    }
  }

