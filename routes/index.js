
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Where My Car', car: '1998 Subaru Outback' });
};

