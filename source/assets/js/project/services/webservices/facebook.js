goog.provide('btr.services.webservices.Facebook');

goog.require('btr.services.webservices.WebService');


/**
 * Facebook controller.
 * @constructor
 */
btr.services.webservices.Facebook = function(app) {

	var credentials = {
    clientID: '1378296422496915',
    clientSecret: 'afbf3e0bf8c72d40db918c969f79b817'
	};

	goog.base(this, app, 'facebook', credentials);
};
goog.inherits(btr.services.webservices.Facebook, btr.services.webservices.WebService);


btr.services.webservices.Facebook.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	var accessToken = this.credentials.accessToken;
	var url = 'https://graph.facebook.com/v2.3/me/photos?access_token='+accessToken;

	goog.base(this, 'getImagesFromUser', url);
};


btr.services.webservices.Facebook.prototype.onLoggedIn = function(e) {

	goog.base(this, 'onLoggedIn', e);

	this.getImagesFromUser();
};


btr.services.webservices.Facebook.prototype.handleImagesFromUser = function(json) {

	var imagesData = goog.array.map(json['data'], function(data) {

		var images = data['images'];

		return {
			'caption': null,
			'url': images[0]['source'],
			'thumbnail': goog.array.peek(images)['source']
		};
	});

	var imagesPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, imagesPanel);
};