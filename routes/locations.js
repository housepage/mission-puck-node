exports.parked = function(req, res){
  req.user.getCar( function(car){
    if(car == 404) {
      res.json(404,{'msg':'No Car Found'});
    }

    car.getLastLocation( function(locationIn) {
      res.json(locationIn); 
    });
  } );
};
