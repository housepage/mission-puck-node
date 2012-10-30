exports.parked = function(req, res){
  console.log("Session: " + req.session);
  console.log("Session (Keys): " + Object.keys(req.session));
  console.log("Auth: " + req.session.auth);
  console.log("Auth (Keys): " + Object.keys(req.session.auth));
  console.log("Facebook Auth: " + req.session.auth.facebook);
  console.log("Facebook Auth (Keys): " + Object.keys(req.session.auth.facebook));
  console.log("loggedIn: " + req.session.auth.loggedIn);
  console.log("loggedIn (Keys): " + Object.keys(req.session.auth.loggedIn));
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
