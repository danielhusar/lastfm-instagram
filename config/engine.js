module.exports = function(app, express){
  'use strict';

  var swig = require('swig'),
      path = require('path');

  //development enviroment
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.logger('dev'));
    swig.setDefaults({ cache: false });
    app.set('view cache', false);
  });

  //production enviroment
  app.configure('production', function(){
    app.use(express.errorHandler());
    app.use(express.logger());
    swig.setDefaults({ cache: true });
    app.set('view cache', true);
  });

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', process.cwd() + '/app/views');

  app.use(express.favicon(process.cwd() + '/public/img/icons/favicon.ico'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('35a4s65d4ad5a5456a4d6ad54a654da6s54d'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(process.cwd(), 'public')));

};
