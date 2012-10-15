var database = require("../database");
var models = database.models[0];

exports.parked = function(req, res){
  res.send(req.session.models.Car.getLocations());
};
