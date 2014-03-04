unless global.hasOwnProperty("db")
  Sequelize = require("sequelize")
  sequelize = null

  if process.env.HEROKU_POSTGRESQL_BRONZE_URL?

    # the application is executed on Heroku ... use the postgres database
    match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect: "postgres"
      protocol: "postgres"
      port: match[4]
      host: match[3]
      logging: true #false
    } )
  else
    # the application is executed on the local machine ... use mysql
    sequelize = new Sequelize "skeletool-node-webapp-test", "skeletal-node-webapp", "locate",
      dialect: "postgres"
      protocol: "postgres"
      logging: true #false

  global.db =
    Sequelize: Sequelize
    sequelize: sequelize
    User: sequelize.import(__dirname + "/user")
    Car: sequelize.import(__dirname + "/car")
    Location: sequelize.import(__dirname + "/location")
    # add your other models here

  global.db.User.hasMany(global.db.Car)
  global.db.Car.hasMany(global.db.Location)

module.exports = global.db
