goog.provide('btr.controllers.globals.ShortcutManager');

goog.require('goog.events');
goog.require('goog.ui.KeyboardShortcutHandler');


/**
 * The global shortcut controller. Allows shortcuts definition and register/unregister
 * shortcuts for entities of any kind.
 * @constructor
 */
btr.controllers.globals.ShortcutManager = function() {

	this._shortcutHandler = new goog.ui.KeyboardShortcutHandler(document);
	goog.events.listen(this._shortcutHandler, goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
		this.onShortcutTriggered, false, this);

	this._shortcuts = {};
	this._callbacks = {};

	var settings = btr.appLoader.getAsset('shortcuts')['shortcuts'];
	this.applySettings( settings );
};
goog.addSingletonGetter(btr.controllers.globals.ShortcutManager);


btr.controllers.globals.ShortcutManager.prototype.register = function(id, callback) {

	var isRegistered = this._shortcutHandler.isShortcutRegistered( this._shortcuts[id] );

	if(isRegistered) {
		return false;
	}

	this._callbacks[id] = callback;

	this._shortcutHandler.registerShortcut( id, this._shortcuts[id] );
};


btr.controllers.globals.ShortcutManager.prototype.unregister = function(id) {

	delete this._callbacks[id];

	this._shortcutHandler.unregisterShortcut( this._shortcuts[id] );
};


btr.controllers.globals.ShortcutManager.prototype.setShortcut = function(id, keyString) {

	var keyAlias = btr.controllers.globals.ShortcutManager.KeyAlias;
	var _keyString = keyString;

	goog.object.forEach(keyAlias, function(actualKeyName, alias) {
		_keyString = _keyString.replace(alias, actualKeyName);
	});

	this._shortcuts[id] = _keyString;
};


btr.controllers.globals.ShortcutManager.prototype.getShortcut = function() {

	return this._shortcuts;
};


btr.controllers.globals.ShortcutManager.prototype.applySettings = function(settings) {

	goog.object.forEach(settings, function(keyString, id) {
		this.setShortcut( id, keyString );
	}, this);

	var shortcuts = this.getShortcut();console.log(shortcuts)
	return shortcuts;
};


btr.controllers.globals.ShortcutManager.prototype.onShortcutTriggered = function(e) {

	var callback = this._callbacks[ e.identifier ];

	if(callback) {
		callback( e.identifier );
	}
};


btr.controllers.globals.ShortcutManager.KeyAlias = {
	'cmd': 'meta'
};