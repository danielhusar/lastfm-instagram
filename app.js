'use strict';

//requires
var express = require('express'),
    helpers = require('./app/helpers/helpers'),
    app = express();

require('./config/engine')(app, express);

//require all controllers with the models
require('fs').readdirSync('./app/controllers').forEach(function(file) {
  var model;
  try{
    model = require('./app/models/' + file).call(app, [helpers]);
  } catch(err) {
    model = false;
  }
  require('./app/controllers/' + file).call(app, [model, helpers]);
});

//require static routes
require('./config/routes').call(app, [helpers]);

//start server
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port: ' + port);
