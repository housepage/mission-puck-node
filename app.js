
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , everyauth = require('everyauth');

console.log(process.env.DATABASE_URL);

var connection_string_regex = /^postgres:\/\/([a-z]+):([a-zA-Z0-9]+)@([a-z0-9\-\.]+):([0-9]*)\/([a-z0-9]+)/;
var connection_parts = process.env.DATABASE_URL.match(connection_string_regex);

var database_username = connection_parts[1],
    database_password = connection_parts[2],
    database_hostname = connection_parts[3],
    database_port = connection_parts[4],
    database_name = connection_parts[5]; 

// All options at once:
var sequelize = new Sequelize(database_name, database_username, database_password, {
  // custom host; default: localhost
  host: database_hostname,
 
  // custom port; default: 3306
  port: database_port,
 
  // custom protocol
  // - default: 'tcp'
  // - added in: v1.5.0
  // - postgres only, useful for heroku
  protocol: 'postgresql',
 
  // disable logging; default: console.log
  logging: false,
 
  // max concurrent database requests; default: 50
  maxConcurrentQueries: 100,
 
  // the sql dialect of the database
  // - default is 'mysql'
  // - currently supported: 'mysql', 'sqlite', 'postgres'
  dialect: 'postgres',
 
  // disable inserting undefined values as NULL
  // - default: false
  omitNull: true,
 
  // specify options, which are used when sequelize.define is called
  // the following example is basically the same as:
  // sequelize.define(name, attributes, { timestamps: false })
  // so defining the timestamps for each model will be not necessary
  define: { timestamps: false },
 
  // similiar for sync: you can define this to always force sync for models
  sync: { force: true },
 
  // use pooling in order to reduce db connection overload and to increase speed
  // currently only for mysql and postgresql (since v1.5.0)
  pool: { maxConnections: 5, maxIdleTime: 30}
})


//setup everyauth
var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.everymodule
  .findUserById( function (id, callback) {
    callback(null, usersById[id]);
  });

var usersByFbId = {};

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
    return usersByFbId[fbUserMetadata.id] ||
            (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
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
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
