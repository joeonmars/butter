goog.provide('btr.services.webservices.Dribbble');

goog.require('btr.services.webservices.WebService');


/**
 * Instagram controller.
 * @constructor
 */
btr.services.webservices.Dribbble = function(app) {

	var credentials = {
	    clientID: '4ffd3399ffc73e37c4b20fc11ca4dc02847cc9568c409545d987e16741894cb1',
	    clientSecret: 'e48ad078391689edeba8d017a297f4386b70e0fbcaf3ffc08a2ff9f9da956c86'
	};

	goog.base(this, app, 'dribbble', credentials);
};
goog.inherits(btr.services.webservices.Dribbble, btr.services.webservices.WebService);


btr.services.webservices.Dribbble.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	var accessToken = this.credentials.accessToken;
	var url = 'https://api.dribbble.com/v1/user/shots?access_token='+accessToken+'&per_page='+count;

	goog.base(this, 'getImagesFromUser', url);
};


btr.services.webservices.Dribbble.prototype.onLoggedIn = function(e) {

	goog.base(this, 'onLoggedIn', e);

	this.getImagesFromUser();
};


btr.services.webservices.Dribbble.prototype.onReceiveImagesFromUser = function(e) {

	var json = JSON.parse( e.target.getResponseText() );

	var imagesData = goog.array.map(json, function(data) {
		return {
			'caption': data['title'],
			'thumbnail': data['images']['teaser']
		};
	});

	var imagesPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, imagesPanel);
};