goog.provide('btr.controllers.basics.Component');

goog.require('goog.array');
goog.require('btr.controllers.basics.Element');
goog.require('btr.controllers.components.EditorWindow');


/**
 * Basic component controller, listen for model(data) changes and update its view.
 * @constructor
 * @param {btr.models.Component} model The data model
 * @param {function():*} opt_view The view constructor
 * @param {function():*} opt_template The template constructor
 * @param {Node} opt_element The dom element
 */
btr.controllers.basics.Component = function( model, opt_view, opt_template, opt_element ) {

	goog.base(this);

	this.model = model;
	this.name = this.model.name;

	var ViewConstructor = opt_view || btr.config.constructors.views[ this.name ];
	var ViewTemplate = opt_template || btr.config.constructors.templates[ this.name ];
	this.view = new ViewConstructor(this.model, ViewTemplate, opt_element);
	this.view.setParentEventTarget(this);

	this.isShortcutEnabled = false;
	this.isEditable = false;

  this._editorWindow = null;

  this._handleShortcut = goog.bind(this.handleShortcut, this);
	this._onDataChange = goog.bind(this.onDataChange, this);
};
goog.inherits(btr.controllers.basics.Component, btr.controllers.basics.Element);


btr.controllers.basics.Component.prototype.doActivate = function() {

	goog.base(this, 'doActivate');

	this.view.activate();

	this.refreshData();

	if(this.isShortcutEnabled) {
		this.refreshShortcuts();
	}

	if(this.isEditable) {
		this.refreshEditorWindow();
	}

  this._eventHandler.listen(this, goog.events.EventType.CONTEXTMENU, this.onContextMenuTriggered, false, this);
};


btr.controllers.basics.Component.prototype.doDeactivate = function() {

	goog.base(this, 'doDeactivate');

	this.view.deactivate();

    var shortcuts = this.model.get('shortcuts');

  	if(shortcuts && this.isShortcutEnabled) {
  		goog.array.forEach(shortcuts, function(name) {
  			btr.shortcuts.unregister(name);
  		});
  	}
};


btr.controllers.basics.Component.prototype.disposeInternal = function() {

	this.model.dispose();
	this.view.dispose();

	goog.base(this, 'disposeInternal');
};


btr.controllers.basics.Component.prototype.add = function(opt_x, opt_y) {

	goog.base(this, 'add');

	this.activate();

	Object.observe(this.model.getData(), this._onDataChange);

	if(goog.isNumber(opt_x) || goog.isNumber(opt_y)) {
		var x = opt_x || 0;
		var y = opt_y || 0;
		goog.style.setPosition( this.view.element, x, y );		
	}

	goog.dom.appendChild( this.view.parentElement, this.view.element );
};


btr.controllers.basics.Component.prototype.remove = function() {

	goog.base(this, 'remove');

	this.deactivate();

	Object.unobserve(this.model.getData(), this._onDataChange);

	goog.dom.removeNode( this.view.element );
};


btr.controllers.basics.Component.prototype.refreshData = function() {

	goog.object.forEach(this.model.getData(), function(value, key) {
		this.view.onDataChange(key, value);
    }, this);
};


btr.controllers.basics.Component.prototype.refreshShortcuts = function() {

    var shortcuts = this.model.get('shortcuts');

  	if(shortcuts) {
  		goog.array.forEach(shortcuts, function(name) {
  			btr.shortcuts.register(name, this._handleShortcut);
  		}, this);
  	}
};


btr.controllers.basics.Component.prototype.refreshEditorWindow = function() {

    this._editorWindow = this._editorWindow || new btr.controllers.components.EditorWindow( this.model );
};


btr.controllers.basics.Component.prototype.handleShortcut = function(id) {

	console.log(id);
};


btr.controllers.basics.Component.prototype.handleContextMenu = function(x, y) {

	console.log('Handle context menu: ' + this.name);

	if(this._editorWindow) {
		this._editorWindow.add(x, y);
	}
};


btr.controllers.basics.Component.prototype.onContextMenuTriggered = function(e) {

	this.handleContextMenu(e.clientX, e.clientY);
};


btr.controllers.basics.Component.prototype.onDataChange = function(changes) {

	goog.array.forEach(changes, function(change) {

		var name = change.name;
		var value = change.object[change.name];
		var oldValue = change.oldValue;

        this.view.onDataChange(name, value, oldValue);

    }, this);
};