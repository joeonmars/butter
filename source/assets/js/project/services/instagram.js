goog.provide('btr.services.Instagram');

goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrIo');


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
	this._accessToken = null;

	this._onReceiveUserInfo = goog.bind(this.onReceiveUserInfo, this);
	this._onReceiveImagesFromUser = goog.bind(this.onReceiveImagesFromUser, this);

	this._iframe = goog.dom.createDom('iframe', {
		'src': 'http://localhost:4444/instagram'
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
goog.inherits(btr.services.Instagram, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.Instagram);


btr.services.Instagram.prototype.onIframeMessage = function(e) {

	var message = e.getBrowserEvent().data;
	console.log(message);

	goog.net.XhrIo.send(
		'http://localhost:4444/instagram/userinfo',
		this._onReceiveUserInfo);
};


btr.services.Instagram.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;
	goog.net.XhrIo.send(
		'https://api.instagram.com/v1/users/self/feed?access_token='+this._accessToken+'&count='+count,
		this._onReceiveImagesFromUser);
};


btr.services.Instagram.prototype.onReceiveUserInfo = function(e) {

	var json = JSON.parse( e.target.getResponseText() );
	this._user = json['user'];
	this._accessToken = json['accessToken'];
	console.log(json);

	this.getImagesFromUser();
};


btr.services.Instagram.prototype.onReceiveImagesFromUser = function(e) {

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

	var instagramPanel = soy.renderAsFragment(btr.templates.Main.InstagramPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, instagramPanel);
};