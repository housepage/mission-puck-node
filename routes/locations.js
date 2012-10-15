var database = require("../database");
var models = database.models[0];

exports.parked = function(req, res){
  res.send(models.Car.getLocations());
};
