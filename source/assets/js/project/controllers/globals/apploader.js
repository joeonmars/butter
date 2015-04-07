goog.provide('btr.controllers.globals.AppLoader');

goog.require('goog.net.BulkLoader');


/**
 * The global bootstrap loader routine, also serves as a global assets library
 * shortcuts for entities of any kind.
 * @constructor
 */
btr.controllers.globals.AppLoader = function(callback) {

	var assetsPath = btr.Config.assetsPath;

	var urls = [
		'/json/config.json',
		'/json/shortcuts.json',
		'/json/components/board.json',
		'/json/components/grid.json',
		'/json/resources/image.json',
		'/json/resources/video.json'
	];

	this._loader = new goog.net.BulkLoader(goog.array.map(urls, function(url) {
		return btr.Config.assetsPath + url;
	}));

	goog.events.listen(this._loader, [goog.net.EventType.SUCCESS, goog.net.EventType.ERROR],
		this.onLoad, false, this);

	this._callback = callback;

	this._assets = {};
};


btr.controllers.globals.AppLoader.prototype.load = function() {

	this._loader.load();
};


btr.controllers.globals.AppLoader.prototype.getAssets = function() {

	return this._assets;
};


btr.controllers.globals.AppLoader.prototype.getAsset = function(id) {

	return this._assets[id];
};


btr.controllers.globals.AppLoader.prototype.onLoad = function(e) {

	var jsons = goog.array.map(e.target.getResponseTexts(), goog.json.unsafeParse);

	goog.array.forEach(jsons, function(json) {
		this._assets[json['name']] = json;
	}, this);

	goog.events.unlisten(this._loader, [goog.net.EventType.SUCCESS, goog.net.EventType.ERROR],
			this.onLoad, false, this);

	this._loader.dispose();

	this._callback( this.getAssets() );
};