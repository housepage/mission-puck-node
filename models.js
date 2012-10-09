exports.models = {
  User : sequelize.define('User', {
    vegetarian: { 'type': Sequelize.BOOLEAN , 'defaultValue': true }
  }),
  FacebookUser: sequelize.define('FacebookUser', {
    facebook_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
  }),
  Car: sequelize.define('Car', {
    make: Sequelize.STRING,
    model: Sequelize.STRING,
  }),
  Location: sequelize.define('Location', {
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    cross_streets: Sequelize.STRING
  }),
};

models.FacebookUser.belongsTo(models.User);
models.User.hasMany(models.Car, { as : 'Cars' } );
models.Car.hasMany(models.Location);
