goog.provide('btr.services.webservices.Flickr');

goog.require('btr.services.webservices.WebService');


/**
 * Flickr controller.
 * @constructor
 */
btr.services.webservices.Flickr = function(app) {

	var credentials = {
	    consumerKey: '87293e9c3583170a0c889931c8315c03',
	    consumerSecret: 'ab8fdc3f36c99695'
	};

	goog.base(this, app, 'flickr', credentials);
};
goog.inherits(btr.services.webservices.Flickr, btr.services.webservices.WebService);


btr.services.webservices.Flickr.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	var accessToken = this.credentials.accessToken;
	var consumerKey = this.credentials.consumerKey;
	var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&user_id=me&per_page=' + count + '&oauth_consumer_key=' + consumerKey + '&oauth_token=' + accessToken + '&format=json&nojsoncallback=1';

	goog.base(this, 'getImagesFromUser', url);
};


btr.services.webservices.Flickr.prototype.onLoggedIn = function(e) {

	goog.base(this, 'onLoggedIn', e);

	this.getImagesFromUser();
};


btr.services.webservices.Flickr.prototype.onReceiveImagesFromUser = function(e) {

	var json = e.target.getResponseJson();

	var imagesData = goog.array.map(json['photos']['photo'], function(data) {

		var title = data['title'];
		var serverId = data['server'];
		var farmId = data['farm'];
		var id = data['id'];
		var secret = data['secret'];

		var thumbnail = ('https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_m.jpg')
		.replace('{farm-id}', farmId).replace('{server-id}', serverId).replace('{id}', id).replace('{secret}', secret);

		var url = ('https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_b.jpg')
		.replace('{farm-id}', farmId).replace('{server-id}', serverId).replace('{id}', id).replace('{secret}', secret);

		return {
			'caption': title,
			'url': url,
			'thumbnail': thumbnail
		};
	});

	var flickrPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, flickrPanel);
};