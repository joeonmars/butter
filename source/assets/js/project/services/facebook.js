goog.provide('btr.services.Facebook');

goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrIo');


/**
 * Facebook service controller.
 * @constructor
 */
btr.services.Facebook = function() {

	goog.base(this);

	this.hasLogin = false;

	this._user = null;
	this._accessToken = null;

	this._onReceiveUserInfo = goog.bind(this.onReceiveUserInfo, this);
	this._onReceiveImagesFromUser = goog.bind(this.onReceiveImagesFromUser, this);

	this._iframe = goog.dom.createDom('iframe', {
		'src': 'http://localhost:4444/facebook'
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
goog.inherits(btr.services.Facebook, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.Facebook);


btr.services.Facebook.prototype.onIframeMessage = function(e) {

	var message = e.getBrowserEvent().data;
	console.log(message);

	goog.net.XhrIo.send(
		'http://localhost:4444/facebook/userinfo',
		this._onReceiveUserInfo);
};


btr.services.Facebook.prototype.getImagesFromUser = function() {

	goog.net.XhrIo.send(
		'https://graph.facebook.com/v2.3/me/photos?access_token='+this._accessToken,
		this._onReceiveImagesFromUser);
};


btr.services.Facebook.prototype.onReceiveUserInfo = function(e) {

	var json = JSON.parse( e.target.getResponseText() );
	this._user = json['user'];
	this._accessToken = json['accessToken'];
	console.log(json);

	this.getImagesFromUser();
};


btr.services.Facebook.prototype.onReceiveImagesFromUser = function(e) {

	var json = JSON.parse( e.target.getResponseText() );

	console.log(json);

	var imagesData = goog.array.map(json['data'], function(data) {

		var images = data['images'];

		return {
			'caption': null,
			'url': images[0]['source'],
			'thumbnail': goog.array.peek(images)['source']
		};
	});

	var facebookPanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, facebookPanel);
};