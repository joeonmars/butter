goog.provide('btr.services.webservices.Instagram');

goog.require('btr.services.webservices.WebService');


/**
 * Instagram controller.
 * @constructor
 */
btr.services.webservices.Instagram = function(app) {

	var credentials = {
	  clientID: '0d4ec1b1993a4ddda250fa3937868809',
	  clientSecret: '26365e4e62b54942bcde46e87b2d96ed'
	};

	var scope = ['basic'];

	goog.base(this, app, 'instagram', credentials, scope);
};
goog.inherits(btr.services.webservices.Instagram, btr.services.webservices.WebService);


btr.services.webservices.Instagram.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	var accessToken = this.credentials.accessToken;
	var url = 'https://api.instagram.com/v1/users/self/feed?access_token='+accessToken+'&count='+count;

	goog.base(this, 'getImagesFromUser', url);
};


btr.services.webservices.Instagram.prototype.onLoggedIn = function(e) {

	goog.base(this, 'onLoggedIn', e);

	this.getImagesFromUser();
};


btr.services.webservices.Instagram.prototype.onReceiveImagesFromUser = function(e) {

	var json = JSON.parse( e.target.getResponseText() );
	
	var images = goog.array.filter(json['data'], function(data) {
		return goog.isDef(data['images']);
	});

	var imagesData = goog.array.map(images, function(data) {
		return {
			'caption': data['caption'] ? data['caption']['text'] : null,
			'thumbnail': data['images']['thumbnail']['url']
		};
	});

	var imagesPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, imagesPanel);
};