exports.parked = function(req, res){
  req.user.getCar( function(car){
    if(car == 404) {
      res.send(car);
    }

    car.getLastLocation( function(locationIn) {
      res.send(locationIn); 
    });
  } );
};
