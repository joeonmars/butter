goog.provide('btr.services.Instagram');

goog.require('goog.events.EventTarget');


/**
 * Instagram service controller.
	 CLIENT ID	0d4ec1b1993a4ddda250fa3937868809
	 CLIENT SECRET	26365e4e62b54942bcde46e87b2d96ed
	 WEBSITE URL	http://localhost:3000
	 REDIRECT URI	http://localhost:3000
 * @constructor
 */
btr.services.Instagram = function() {

	goog.base(this);

	this.hasLogin = false;

	this._user = null;

	// create a server for authentication
	var http = require('http');
	var serveStatic = require('serve-static');

	var serve = serveStatic('./', {
		'index': 'instagram.html'
	});

	var server = http.createServer(function(req, res){
	  serve(req, res);
	});

	server.listen(3000);

	this._iframe = null;
};
goog.inherits(btr.services.Instagram, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.Instagram);


btr.services.Instagram.prototype.login = function() {

	var url = 'https://instagram.com/oauth/authorize/?client_id=0d4ec1b1993a4ddda250fa3937868809&redirect_uri=http://localhost:3000&response_type=token';
	
	this._iframe = goog.dom.createDom('iframe', {
		'src': url
	});
	goog.dom.appendChild(document.body, this._iframe);

	/*
	this._iframe.contentWindow.callback = goog.bind(function(){
		this._iframe.contentWindow.postMessage('hello there', '*');
	}, this);
*/
};


btr.services.Instagram.prototype.getFromUser = function() {


};