module.exports = (sequelize, DataTypes) ->
  return sequelize.define "Location", {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    timestamp: DataTypes.DATE
  }, {
    instanceMethods: {


    }
  }

