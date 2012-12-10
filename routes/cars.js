exports.add_car = function(req, res) {
  res.render('add-car',{ title: 'Add a Car', makes: ['Subaru','Oldsmobile'], models: ['Super','Outback'] });
};
