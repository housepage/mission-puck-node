exports.parked = function(req, res){
  console.log("Session: " + req.user);
  console.log("Session (Keys): " + Object.keys(req.user));
  console.log("Auth: " + req.user.auth);
  console.log("Auth (Keys): " + Object.keys(req.user.auth));
  console.log("Auth: " + req.user.auth.facebook);
  console.log("Auth (Keys): " + Object.keys(req.user.auth.facebook));
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
