exports.parked = function(req, res){
  console.log("Session: " + everyauth);
  console.log("Session (Keys): " + Object.keys(everyauth));
  console.log("Auth: " + everyauth.user);
  console.log("Auth (Keys): " + Object.keys(everyauth.user));
  everyauth.user.getCar( function(car){
    res.send(car);
  } );
};
