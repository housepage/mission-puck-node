exports.parked = function(req, res){
  console.log("Session: " + req.session);
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
