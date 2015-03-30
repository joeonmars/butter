goog.provide('btr.controllers.components.EditorWindow');

goog.require('goog.fx.Dragger');
goog.require('btr.controllers.basics.Component');
goog.require('btr.views.components.EditorWindow');


/**
 * Editor Window component controller.
 * @constructor
 * @param {btr.models.Component} model The data model
 */
btr.controllers.components.EditorWindow = function( model ) {

	goog.base(this, model, btr.views.components.EditorWindow, btr.templates.Main.EditorWindow);

	this._dragger = new goog.fx.Dragger(this.view.element, this.view.titleBar);
};
goog.inherits(btr.controllers.components.EditorWindow, btr.controllers.basics.Component);


btr.controllers.components.EditorWindow.prototype.doActivate = function() {

	goog.base(this, 'doActivate');

	this._eventHandler.listen(this, goog.events.EventType.CHANGE, this.onFieldChange, false, this);
	this._eventHandler.listen(this, goog.events.EventType.CLICK, this.onClick, false, this);
	this._eventHandler.listen(document, goog.events.EventType.MOUSEDOWN, this.onMouseDown, false, this);
	this._eventHandler.listen(window, goog.events.EventType.RESIZE, this.remove, false, this);
};


btr.controllers.components.EditorWindow.prototype.onFieldChange = function(e) {

	var id = e.target.getAttribute('data-id');

	var value = e.target.value;
	value = (e.target.getAttribute('type') === 'number') ? parseFloat(value) : value;

	this.model.set(id, value);
};


btr.controllers.components.EditorWindow.prototype.onMouseDown = function(e) {

	if(!goog.dom.contains(this.view.element, e.target)) {
		this.remove();
	}
};


btr.controllers.components.EditorWindow.prototype.onClick = function(e) {

	var id = e.target.getAttribute('data-id');

	switch(id) {
		case 'toggle':
		this.view.toggle();
		break;

		case 'close':
		this.remove();
		break;
	}
};