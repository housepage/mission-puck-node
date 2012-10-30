exports.parked = function(req, res){
  console.log("Session: " + req);
  console.log("Session (Keys): " + Object.keys(req));
  console.log("Auth: " + req.user);
  console.log("Auth (Keys): " + Object.keys(req.user));
  req.user.getCar( function(car){
    res.send(car);
  } );
};
