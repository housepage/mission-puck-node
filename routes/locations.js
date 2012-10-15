exports.parked = function(req, res){
  res.send(req.session.models.Car.getLocations());
};
