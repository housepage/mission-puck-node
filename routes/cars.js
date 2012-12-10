exports.add_car = function(req, res) {
  res.render('add-car',{ makes: ['Subaru','Oldsmobile'], models: ['Super','Outback'] });
};
