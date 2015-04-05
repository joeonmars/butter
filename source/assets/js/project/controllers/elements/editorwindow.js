goog.provide('btr.controllers.elements.EditorWindow');

goog.require('goog.dom.classlist');
goog.require('goog.fx.Dragger');
goog.require('btr.templates.Component');
goog.require('btr.controllers.basics.Control');


/**
 * Editor Window.
 * @constructor
 * @param {btr.models.Model} model The data model
 */
btr.controllers.elements.EditorWindow = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	var element = this.getElement();
	var titleBar = goog.dom.getElementByClass('title-bar', element);
	this._dragger = new goog.fx.Dragger(element, titleBar);

	// replace placeholder fields
	var fieldEls = goog.dom.getElementsByClass('field', element);

	this._fieldEls = goog.array.map(fieldEls, function(fieldEl) {
		var template;
		var fieldType = fieldEl.getAttribute('data-type');
		var fieldId = fieldEl.getAttribute('data-id');
		
		switch(fieldType) {
			case 'integer':
			case 'integerrange':
			template = btr.templates.Component.IntegerField;
			break;

			case 'number':
			case 'numberrange':
			template = btr.templates.Component.NumberField;
			break;

			case 'color':
			template = btr.templates.Component.ColorField;
			break;
		}

		var el;

		if(template) {
			
			el = soy.renderAsFragment( template, {
				name: fieldId,
				data: model.getDefaultData()[fieldId]
			});

			goog.dom.replaceNode( el, fieldEl );

		}else {

			el = fieldEl;
		}

		return el;
	});

	// buttons
	this._toggleButton = goog.dom.query('button[data-id="toggle"]', element)[0];
	this._closeButton = goog.dom.query('button[data-id="close"]', element)[0];
};
goog.inherits(btr.controllers.elements.EditorWindow, btr.controllers.basics.Control);


btr.controllers.elements.EditorWindow.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();

	goog.array.forEach(this._fieldEls, function(fieldEl) {
		handler.listen(fieldEl, goog.events.EventType.CHANGE, this.onFieldChange, false, this);
	}, this);

	handler.listen(document, goog.events.EventType.MOUSEDOWN, this.onMouseDown, false, this);
	handler.listen(window, goog.events.EventType.RESIZE, this.onResize, false, this);
};


btr.controllers.elements.EditorWindow.prototype.togglePanel = function() {

	if(goog.dom.classlist.contains(this.getElement(), 'hide-property')) {
		this.expand();
	}else {
		this.collapse();
	}
};


btr.controllers.elements.EditorWindow.prototype.expand = function() {

	goog.dom.classlist.enable(this.getElement(), 'hide-property', false);
};


btr.controllers.elements.EditorWindow.prototype.collapse = function() {

	goog.dom.classlist.enable(this.getElement(), 'hide-property', true);
};


btr.controllers.elements.EditorWindow.prototype.onFieldChange = function(e) {

	var id = e.target.getAttribute('data-id');

	var value = e.target.value;
	value = (e.target.getAttribute('type') === 'number') ? parseFloat(value) : value;

	this.model.set(id, value);
};


btr.controllers.elements.EditorWindow.prototype.onMouseDown = function(e) {

	if(!goog.dom.contains(this.getElement(), e.target)) {
		this.setVisible(false);
	}
};


btr.controllers.elements.EditorWindow.prototype.handleMouseUp = function(e) {

	var id = e.target.getAttribute('data-id');

	switch(id) {
		case 'toggle':
		this.togglePanel();
		break;

		case 'close':
		this.setVisible(false);
		break;
	}
};


btr.controllers.elements.EditorWindow.prototype.onResize = function(e) {

	this.setVisible(false);
};