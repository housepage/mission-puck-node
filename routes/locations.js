exports.parked = function(req, res){
  console.log("Session: " + req.session);
  console.log("Auth: " + req.session.auth);
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
