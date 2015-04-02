goog.provide('btr.services.Flickr');

goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrIo');


/**
 * Flickr service controller.
 * @constructor
 */
btr.services.Flickr = function() {

	goog.base(this);

	this.hasLogin = false;

	this._user = null;
	this._accessToken = null;
	this._consumerKey = null;

	this._onReceiveUserInfo = goog.bind(this.onReceiveUserInfo, this);
	this._onReceiveImagesFromUser = goog.bind(this.onReceiveImagesFromUser, this);

	this._iframe = goog.dom.createDom('iframe', {
		'src': 'http://localhost:4444/flickr'
	});
	goog.style.setStyle(this._iframe, {
		'position': 'absolute',
		'width': 680+'px',
		'height': 520+'px',
		'outline': '1px solid black'
	});
	goog.dom.appendChild(document.body, this._iframe);

	goog.events.listen(window, goog.events.EventType.MESSAGE, this.onIframeMessage, false, this);
};
goog.inherits(btr.services.Flickr, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.Flickr);


btr.services.Flickr.prototype.onIframeMessage = function(e) {

	var message = e.getBrowserEvent().data;
	console.log(message);

	goog.net.XhrIo.send(
		'http://localhost:4444/flickr/userinfo',
		this._onReceiveUserInfo);
};


btr.services.Flickr.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;

	goog.net.XhrIo.send(
		'https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&user_id=me&per_page=' + count + '&oauth_consumer_key=' + this._consumerKey + '&oauth_token=' + this._accessToken,
		this._onReceiveImagesFromUser);
};


btr.services.Flickr.prototype.onReceiveUserInfo = function(e) {

	var json = JSON.parse( e.target.getResponseText() );
	this._user = json['user'];
	this._consumerKey = json['consumerKey'];
	this._accessToken = json['accessToken'];
	console.log(json);

	this.getImagesFromUser();
};


btr.services.Flickr.prototype.onReceiveImagesFromUser = function(e) {

	var json = JSON.parse( e.target.getResponseText() );

	console.log(json);
/*
	var imagesData = goog.array.map(json['data'], function(data) {

		var images = data['images'];

		return {
			'caption': null,
			'url': images[0]['source'],
			'thumbnail': goog.array.peek(images)['source']
		};
	});

	var flickrPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, flickrPanel);*/
};