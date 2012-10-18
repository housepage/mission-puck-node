exports.parked = function(req, res){
  console.log("Session: " + req.session);
  console.log("Session (Keys): " + Object.keys(req.session));
  console.log("Auth: " + req.session.auth);
  console.log("Auth (Keys): " + Object.keys(req.session.auth));
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
