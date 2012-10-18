exports.parked = function(req, res){
  console.log("Session: " + req.session);
  console.log("Session (Keys): " + Object.keys(req.session));
  console.log("Session Index: " + req.session[0]);
  console.log("Session Index (Keys): " + Object.keys(req.session[0]));
  console.log("Auth: " + req.session.auth);
  req.session.auth.facebook.getCar( function(car){
    res.send(car);
  } );
};
