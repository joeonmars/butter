goog.provide('btr.views.components.Component');

goog.require('goog.dom.query');
goog.require('goog.style');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * Base component view, dispatch UI events to controller.
 * @constructor
 * @param {btr.models.Component} model The view model
 * @param {function():*} template The view template
 * @param {element} opt_element The dom element
 */
btr.views.components.Component = function(model, template, opt_element) {

	goog.base(this);

	this.model = model;

	this.element = opt_element || soy.renderAsFragment( template, {
		data: model.getDefaultData()
	});

	this.parentElement = this.element.parentNode;
	this.hotspotElement = this.element;

	this.isShown = true;
	this.isActive = false;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(btr.views.components.Component, goog.events.EventTarget);


btr.views.components.Component.prototype.activate = function() {

	if(this.isActive) {

		return;

	}else {

		this.isActive = true;
		this.doActivate();
	}
};


btr.views.components.Component.prototype.deactivate = function() {

	if(!this.isActive) {
		
		return;

	}else {

		this.isActive = false;
		this.doDeactivate();
	}
};


btr.views.components.Component.prototype.show = function() {

	this.isShown = true;

	goog.style.setElementShown(this.element, true);
};


btr.views.components.Component.prototype.hide = function() {

	this.isShown = false;

	goog.style.setElementShown(this.element, false);
};


btr.views.components.Component.prototype.doActivate = function() {

	this._eventHandler.listen(this.hotspotElement, goog.events.EventType.CONTEXTMENU, this.dispatchEvent, false, this);
};


btr.views.components.Component.prototype.doDeactivate = function() {

	this._eventHandler.removeAll();
};


btr.views.components.Component.prototype.query = function(selector) {

	return goog.dom.query(selector, this.element);
};


btr.views.components.Component.prototype.disposeInternal = function() {

	this.deactivate();

	goog.base(this, 'disposeInternal');
};


btr.views.components.Component.prototype.onDataChange = function(name, newValue, oldValue) {

	console.log(name, newValue, oldValue);
};