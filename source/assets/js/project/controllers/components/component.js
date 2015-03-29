goog.provide('btr.controllers.components.Component');

goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('btr.controllers.components.EditorWindow');


/**
 * Basic component controller, listen for model(data) changes and update its view.
 * @constructor
 * @param {btr.models.Component} model The data model
 * @param {function():*} opt_view The optional view constructor
 * @param {function():*} opt_template The optional template constructor
 */
btr.controllers.components.Component = function( model, opt_view, opt_template ) {

	goog.base(this);

	this.model = model;

	var ViewConstructor = opt_view || btr.config.constructors.views[ this.model.name ];
	var ViewTemplate = opt_template || btr.config.constructors.templates[ this.model.name ];
	this.view = new ViewConstructor(ViewTemplate, this.model);
	this.view.setParentEventTarget(this);

	this._eventHandler = new goog.events.EventHandler(this);

  	this._shortcutHandler = new goog.ui.KeyboardShortcutHandler(document);

  	this._editorWindow = null;

	this._onDataChange = goog.bind(this.onDataChange, this);
};
goog.inherits(btr.controllers.components.Component, goog.events.EventTarget);


btr.controllers.components.Component.prototype.activate = function() {

	Object.observe(this.model.getData(), this._onDataChange);

	this.view.activate();

	this.refreshData();
	this.refreshShortcuts();

  	this._eventHandler.listen(this._shortcutHandler, goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED, this.onShortcutTriggered, false, this);
  	this._eventHandler.listen(this, goog.events.EventType.CONTEXTMENU, this.onContextMenuTriggered, false, this);
};


btr.controllers.components.Component.prototype.deactivate = function() {

	Object.unobserve(this.model.getData(), this._onDataChange);

	this.view.deactivate();

	this._shortcutHandler.unregisterAll();

	this._eventHandler.removeAll();
};


btr.controllers.components.Component.prototype.disposeInternal = function() {

	this.deactivate();

	this._shortcutHandler.dispose();

	this.model.dispose();
	this.view.dispose();

	goog.base(this, 'disposeInternal');
};


btr.controllers.components.Component.prototype.add = function(opt_x, opt_y) {

	var x = opt_x || 0;
	var y = opt_y || 0;

	this.activate();

	goog.style.setPosition( this.view.element, x, y );
	goog.dom.appendChild( this.view.parentElement, this.view.element );
};


btr.controllers.components.Component.prototype.remove = function() {

	this.deactivate();
	goog.dom.removeNode( this.view.element );
};


btr.controllers.components.Component.prototype.refreshData = function() {

	goog.object.forEach(this.model.getData(), function(value, key) {
		this.view.onDataChange(key, value);
    }, this);
};


btr.controllers.components.Component.prototype.refreshShortcuts = function() {

    var shortcuts = this.model.get('shortcuts');

  	if(shortcuts) {

  		goog.array.forEach(shortcuts, function(name) {
  			if(!this._shortcutHandler.isShortcutRegistered(name)) {
	  			var shortcuts = btr.config.shortcuts[ name ];
	  			var params = ([name]).concat( shortcuts );
	  			this._shortcutHandler.registerShortcut.apply(this._shortcutHandler, params);
  			}
  		}, this);
  	}
};


btr.controllers.components.Component.prototype.handleShortcut = function(id) {

	console.log(id);
};


btr.controllers.components.Component.prototype.handleContextMenu = function(x, y) {

	console.log('Handle context menu.');

	if(this._editorWindow) {
		this._editorWindow.add(x, y);
	}
};


btr.controllers.components.Component.prototype.onShortcutTriggered = function(e) {

	this.handleShortcut( e.identifier );
};


btr.controllers.components.Component.prototype.onContextMenuTriggered = function(e) {

	this.handleContextMenu(e.clientX, e.clientY);
};


btr.controllers.components.Component.prototype.onDataChange = function(changes) {

	goog.array.forEach(changes, function(change) {

		var name = change.name;
		var value = change.object[change.name];
		var oldValue = change.oldValue;

		if(name === 'shortcuts') {
			this.refreshShortcuts();
		}

		if(name === 'editable' && value === true) {
			this._editorWindow = this._editorWindow || new btr.controllers.components.EditorWindow( this.model );
			//this._editorWindow.activate();
		}

        this.view.onDataChange(name, value, oldValue);

    }, this);
};