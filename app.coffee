
###
Module dependencies.
###
db = require('./models')
routes = require("./routes")
user = require("./routes/user")

express = require("express")
http = require("http")
mustacheExpress = require("mustache-express")
path = require("path")

app = express()

app.engine 'mustache', mustacheExpress()

# all environments
app.set "port", process.env.PORT or 3000
app.set "views", __dirname + "/views"
app.set "view engine", "mustache"
app.use express.favicon()
app.use express.logger("dev")
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.cookieParser("I like cookies")
app.use express.session()
app.use app.router
app.use require("stylus").middleware(__dirname + "/public")
app.use express.static(path.join(__dirname, "public"))

# development only
app.use express.errorHandler()  if "development" is app.get("env")
app.get "/", routes.index
app.get "/users", user.list

db.sequelize.sync().complete (err) ->
  if err
    throw err
  else
    http.createServer(app).listen app.get("port"), ->
      console.log "Express server listening on port " + app.get("port")


