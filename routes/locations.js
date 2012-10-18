exports.parked = function(req, res){
  req.session.auth.getCar( function(car){
    res.send(car);
  } );
};
