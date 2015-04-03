goog.provide('btr.services.webservices.Behance');

goog.require('btr.services.webservices.WebService');


/**
 * Behance controller.
 * @constructor
 */
btr.services.webservices.Behance = function(app) {

	var credentials = {
	  clientID: '0d4ec1b1993a4ddda250fa3937868809',
	  clientSecret: '26365e4e62b54942bcde46e87b2d96ed'
	};

	goog.base(this, app, 'behance', credentials);
};
goog.inherits(btr.services.webservices.Behance, btr.services.webservices.WebService);


btr.services.webservices.Behance.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	var accessToken = this.credentials.accessToken;
	var consumerKey = this.credentials.consumerKey;
	var url = 'https://api.behance.com/services/rest/?method=behance.people.getPhotos&user_id=me&per_page=' + count + '&oauth_consumer_key=' + consumerKey + '&oauth_token=' + accessToken + '&format=json&nojsoncallback=1';

	goog.base(this, 'getImagesFromUser', url);
};


btr.services.webservices.Behance.prototype.onLoggedIn = function(e) {

	goog.base(this, 'onLoggedIn', e);

	this.getImagesFromUser();
};


btr.services.webservices.Behance.prototype.onReceiveImagesFromUser = function(e) {

	var json = e.target.getResponseJson();

	
};