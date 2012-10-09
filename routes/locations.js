
exports.parked = function(req, res){
  res.send(models.Car.getLocations());
};
