goog.provide('btr.services.Dribbble');

goog.require('goog.events.EventTarget');
goog.require('goog.net.XhrIo');


/**
 * Dribbble service controller.
 * @constructor
 */
btr.services.Dribbble = function() {

	goog.base(this);

	this.hasLogin = false;

	this._user = null;
	this._accessToken = null;

	this._onReceiveUserInfo = goog.bind(this.onReceiveUserInfo, this);
	this._onReceiveImagesFromUser = goog.bind(this.onReceiveImagesFromUser, this);

	this._iframe = goog.dom.createDom('iframe', {
		'src': 'http://localhost:4444/dribbble'
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
goog.inherits(btr.services.Dribbble, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.Dribbble);


btr.services.Dribbble.prototype.onIframeMessage = function(e) {

	var message = e.getBrowserEvent().data;
	console.log(message);

	goog.net.XhrIo.send(
		'http://localhost:4444/dribbble/userinfo',
		this._onReceiveUserInfo);
};


btr.services.Dribbble.prototype.getImagesFromUser = function(opt_count) {

	var count = opt_count || 1000;

	goog.net.XhrIo.send(
		'https://api.dribbble.com/v1/user/shots?access_token='+this._accessToken+'&per_page='+count,
		this._onReceiveImagesFromUser);
};


btr.services.Dribbble.prototype.onReceiveUserInfo = function(e) {

	var json = JSON.parse( e.target.getResponseText() );
	this._user = json['user'];
	this._accessToken = json['accessToken'];
	console.log(json);

	this.getImagesFromUser();
};


btr.services.Dribbble.prototype.onReceiveImagesFromUser = function(e) {

	var json = JSON.parse( e.target.getResponseText() );

	console.log(json);

	var imagesData = goog.array.map(json, function(data) {
		return {
			'caption': data['title'],
			'thumbnail': data['images']['teaser']
		};
	});

	var dribbblePanel = soy.renderAsFragment(btr.templates.Main.ImagesPanel, {
		images: imagesData
	});
	goog.dom.appendChild(document.body, dribbblePanel);
};