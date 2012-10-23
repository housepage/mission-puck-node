
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , locations = require('./routes/locations')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth');

var database = require("./database");

// All options at once:
var sequelize = database.sequelize;
var models = database.models;

//setup everyauth
var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  if (arguments.length === 1) {
    return undefined;
  }

  var user, facebook;
  
  sourceUser.facebook_id = sourceUser.id;
  facebook = models.FacebookUser.build();
  facebook.facebook_id = sourceUser.id;
  facebook.first_name = sourceUser.first_name
  facebook.last_name = sourceUser.last_name
  facebook.name = sourceUser.name

  user = models.User.build({});
  user.vegetarian = true;
  user.save()
    .success(function() {
      facebook.setUser(user);
      facebook.save()
        .success(function() {})
        .error(function() {});
     })
    .error(function(error) { });
  
  return user;
}

/*everyauth.everymodule
  .findUserById( function (id, callback) {
    var user = models.User.find({ where: { id: id }})[0]; 
    callback(null, user);
  });*/

var usersByFbId = {};

/* Example Facebook User Object:
  {"id":"10508822","name":"Andrew Gall","first_name":"Andrew","last_name":"Gall","link":"http://www.facebook.com/housepage","username":"housepage","hometown":{"id":"111952012155701","name":"Marietta, Pennsylvania"},"location":{"id":"110843418940484","name":"Seattle, Washington"},"quotes":"\"Live truly and truly you are free\"\r\n-Andrew Gall\r\n\r\n\"Our lives begin to end the day we become silent about things that matter.\"\r\n- Martin Luther King Jr.\r\n\r\n\"Love truth, and pardon error.\"\r\n- Voltaire\r\n\r\n\"I wish I could apt-get a pizza\"\r\n-Talisha Lopez\r\n\r\n\"Happiness is a perfume you cannot pour on others without getting a few drops on yourself.\"\r\n- Ralph Waldo Emerson\r\n\r\n\"Sometimes it is said that man can not be trusted with the government of himself. Can he, then, be trusted with the government of others? Or have we found angels in the forms of kings to govern him? Let history answer this question.\"\r\n-Thomas Jeffersion (1st Inaugural Address)\r\n\r\n\"Before you embark on a journe
  2012-10-08T06:27:33+00:00 app[web.1]: y of revenge, dig two graves.\"\r\n- Confucius\r\n\r\n\"Silence is Participation\"\r\n- Richard Rush\r\n\r\n\"Nearly all men can stand adversity, but if you want to test a man's character, give him power\"\r\n- Abraham Lincoln","inspirational_people":[{"id":"160449914018111","name":"Martin Luther King, Jr."},{"id":"107977809230256","name":"Thomas Jefferson"},{"id":"107670709262200","name":"Voltaire"},{"id":"105574829475447","name":"Richard Rush"},{"id":"106676942701904","name":"Gandhi"}],"gender":"male","timezone":-7,"locale":"en_US","languages":[{"id":"106059522759137","name":"English"}],"verified":true,"updated_time":"2012-10-07T02:57:12+0000"} */

everyauth.facebook
  .appId('527409683954743')
  .appSecret('6d74f59e13b26f01eff270356c6d5880')
  .handleAuthCallbackError( function (req, res) {
    // If a user denies your app, Facebook will redirect the user to
    // /auth/facebook/callback?error_reason=user_denied&error=access_denied&error_description=The+user+denied+your+request.
    // This configurable route handler defines how you want to respond to
    // that.
    // If you do not configure this, everyauth renders a default fallback
    // view notifying the user that their authentication failed and why.
    console.log(res);
  })
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    var facebook_user;

    var promise = this.Promise();

    models.FacebookUser.find({ where: 'facebook_id = ' + fbUserMetadata.id }).success(function(user) {
      if(user != undefined) {
        promise.fulfill(user.user);
      } else {
        promise.fulfill(addUser('facebook', fbUserMetadata));
      }
    });

    return promise;
  })
  .redirectPath('/');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('GSBhyVcgTf+fugJKdJLI0wrU3TrzaEAAqmnxsTg4EFQ='));
  app.use(express.cookieSession());
  app.use(everyauth.middleware());
  app.use('/',function(req, res, next){

    if(req.session.auth != undefined) {
      console.log("Request: " + req.session.auth.facebook);
    } else {
      res.redirect('/auth/facebook');
    }

    req.models = models;

    next();
  });
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/parked', locations.parked);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
