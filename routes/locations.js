var database = require("./database");
var models = database.models;

exports.parked = function(req, res){
  res.send(models.Car.getLocations());
};
