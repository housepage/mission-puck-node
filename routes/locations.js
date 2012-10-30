exports.parked = function(req, res){
  req.user.getCar( function(car){
    if(car == 404) {
      res.json(car);
    }

    car.getLastLocation( function(locationIn) {
      res.json(locationIn); 
    });
  } );
};
