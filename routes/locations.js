exports.parked = function(req, res){
  res.send(req.models.Car.getLocations());
};
