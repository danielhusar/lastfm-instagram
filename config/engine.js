module.exports = function(app, express){
  'use strict';

  var swig   = require('swig'),
      path   = require('path');

  //development enviroment
  app.configure('development', function(){
    //errors handling
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger('dev'));

    //swig settings
    swig.setDefaults({ cache: false });
    app.set('view cache', false);
  });

  //production enviroment
  app.configure('production', function(){
    //errors handling
    app.use(express.errorHandler());
    app.use(express.logger());
    //swig settings
    swig.setDefaults({ cache: true });
    app.set('view cache', true);
  });

  //settings

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', process.cwd() + '/app/views');

  app.use(express.favicon(process.cwd() + '/public/img/icons/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secreet key'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(process.cwd(), 'public')));

};
