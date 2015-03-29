goog.provide('btr.views.components.Component');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * Base component view, dispatch UI events to controller.
 * @constructor
 * @param {function():*} template The view template
 * @param {btr.models.Component} model The view model
 */
btr.views.components.Component = function(template, model) {

	goog.base(this);

	this.element = soy.renderAsFragment( template, {
		data: model.getDefaultData()
	});

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(btr.views.components.Component, goog.events.EventTarget);


btr.views.components.Component.prototype.activate = function() {

	this._eventHandler.listen(this.element, goog.events.EventType.CONTEXTMENU, this.dispatchEvent, false, this);
};


btr.views.components.Component.prototype.deactivate = function() {

	this._eventHandler.removeAll();
};


btr.views.components.Component.prototype.disposeInternal = function() {

	this.deactivate();

	goog.base(this, 'disposeInternal');
};


btr.views.components.Component.prototype.onDataChange = function(name, newValue, oldValue) {

	console.log(name, newValue, oldValue);
};