exports.parked = function(req, res){
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
