goog.provide('btr.services.webservices.WebServiceServer');

goog.require('goog.net.XhrIo');
goog.require('btr.services.webservices.Dribbble');
goog.require('btr.services.webservices.Facebook');
goog.require('btr.services.webservices.Instagram');
goog.require('btr.services.webservices.Flickr');


/**
 * Web service server, running off localhost and handles authentications.
 * @constructor
 */
btr.services.webservices.WebServiceServer = function() {

	this.instagram = null;
	this.facebook = null;
	this.flickr = null;
	this.dribbble = null;

	this.createServer();
};
goog.addSingletonGetter(btr.services.webservices.WebServiceServer);


btr.services.webservices.WebServiceServer.prototype.createServer = function() {

	var express = require('express');
	var passport = require('passport');
	var session = require('express-session');

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	var app = express();

	// configure Express
	app.set('views', btr.config.assetsPath + 'views');
	app.set('view engine', 'ejs');

	app.use(session({
	  secret: 'anything',
	  resave: true,
	  saveUninitialized: true
	}));

	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());
	//app.use(express.static(btr.config.assetsPath + 'public'));

	this.facebook = new btr.services.webservices.Facebook(app);
	this.instagram = new btr.services.webservices.Instagram(app);
	this.dribbble = new btr.services.webservices.Dribbble(app);
	this.flickr = new btr.services.webservices.Flickr(app);

	app.listen( btr.services.webservices.WebServiceServer.Port );
};


btr.services.webservices.WebServiceServer.Port = 4444;