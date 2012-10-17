exports.parked = function(req, res){
  req.models.Car.getLocations(function(locationFound) {
    res.send(locationFound);
  });
};
