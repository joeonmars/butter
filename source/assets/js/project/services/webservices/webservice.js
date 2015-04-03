goog.provide('btr.services.webservices.WebService');

goog.require('goog.net.XhrIo');


/**
 * Web service controller.
 * @constructor
 */
btr.services.webservices.WebService = function(app, name, credentials, opt_scope) {

	var port = btr.services.webservices.WebServiceServer.Port;

	this.credentials = {
		callbackURL: 'http://localhost:' + port + '/' + name + '/auth/callback'
	};

	goog.object.extend(this.credentials, credentials);

	this.user = null;
	this.hasLogin = false;

	this._name = name;
	this._app = app;
	this._scope = opt_scope || [];

	this._loginWindow = null;

	//this._onReceiveUserInfo = goog.bind(this.onReceiveUserInfo, this);
	this._onReceiveImagesFromUser = goog.bind(this.onReceiveImagesFromUser, this);

	this.init();
};


btr.services.webservices.WebService.prototype.init = function() {

	var app = this._app;
	var name = this._name;
	var scope = this._scope;

	var passport = require('passport');
	var Strategy = require('passport-'+name).Strategy;

	var port = btr.services.webservices.WebServiceServer.Port;

	passport.use(new Strategy(this.credentials,

    goog.bind(function(accessToken, refreshToken, profile, done) {

      done(null, profile);
      
      this.user = profile;
      this.credentials.accessToken = accessToken;
     
      if(this._loginWindow) {
      	this._loginWindow.close();
      }

      this.onLoggedIn();

    }, this)

  ));

	// Define routes and paths
	var routeDefault = '/' + name;
	var pathDefault = name + '/index';

	var routeLogOut = '/' + name + '/logout';
	var routeLogOutRedirect = '/' + name;

	var routeAuth = '/' + name + '/auth';

	var routeCallback = '/' + name + '/auth/callback';
	var pathCallbackFailureRedirect = '/' + name;
	var pathCallbackSuccessRedirect = '/' + name;

	var routeUserInfo = '/' + name + '/userinfo';

  // Render router view
  app.get(routeDefault, function(req, res){
    res.render(pathDefault, { user: req.user });
  });

  app.get(routeLogOut, function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect(routeLogOutRedirect);
  });

  // Router actions
  app.get(routeAuth,
    passport.authenticate(name, {
    	scope: scope
    }),
    function(req, res){
      // The request will be redirected to the service website for authentication,
      // so this function will not be called.
    });

  app.get(routeCallback, 
    passport.authenticate(name, { failureRedirect: pathCallbackFailureRedirect }),
    function(req, res) {
      res.redirect(pathCallbackSuccessRedirect);
    });

  // API end points
  /*
  app.get(routeUserInfo, function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(instagram.userinfo));
  });
	*/
};


btr.services.webservices.WebService.prototype.login = function() {

	var name = this._name;
	var port = btr.services.webservices.WebServiceServer.Port;

	this._loginWindow = btr.utils.Common.openWindow( 'http://localhost:' + port + '/' + name );
};


btr.services.webservices.WebService.prototype.onLoggedIn = function(e) {

	console.log('Log in!');

	var name = this._name;
	var port = btr.services.webservices.WebServiceServer.Port;
/*
	goog.net.XhrIo.send(
		'http://localhost:' + port + '/' + name + '/userinfo',
		this._onReceiveUserInfo);
*/
};


btr.services.webservices.WebService.prototype.getImagesFromUser = function(url) {

	goog.net.XhrIo.send( url, this._onReceiveImagesFromUser );
};

/*
btr.services.webservices.WebService.prototype.onReceiveUserInfo = function(e) {

	this.hasLogin = true;

	var json = JSON.parse( e.target.getResponseText() );
	this.user = json['user'];

	console.log('Received user info:', json);
};
*/


btr.services.webservices.WebService.prototype.onReceiveImagesFromUser = function(e) {

};