exports.parked = function(req, res){
  console.log("Session: " + req.session[0]);
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
