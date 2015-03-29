goog.provide('btr.views.components.EditorWindow');

goog.require('goog.dom.query');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('btr.views.components.Component');


/**
 * Editor Window view.
 * @constructor
 * @param {function():*} template The view template
 * @param {btr.models.Component} model The view model
 */
btr.views.components.EditorWindow = function( template, model ) {

	goog.base(this, template, model);

	this.parentElement = goog.dom.getElement('window-editor-container');

	this.titleBar = goog.dom.getElementByClass('title-bar', this.element);

	// replace placeholder fields
	var fieldEls = goog.dom.getElementsByClass('field', this.element);

	this._fieldEls = goog.array.map(fieldEls, function(fieldEl) {
		var template;
		var fieldType = fieldEl.getAttribute('data-type');
		var fieldId = fieldEl.getAttribute('data-id');
		
		switch(fieldType) {
			case 'integer':
			template = btr.templates.Main.IntegerField;
			break;

			case 'number':
			template = btr.templates.Main.NumberField;
			break;

			case 'color':
			template = btr.templates.Main.ColorField;
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
	this._toggleButton = goog.dom.query('button[data-id="toggle"]', this.element)[0];
	this._closeButton = goog.dom.query('button[data-id="close"]', this.element)[0];
};
goog.inherits(btr.views.components.EditorWindow, btr.views.components.Component);


btr.views.components.EditorWindow.prototype.activate = function() {

	goog.base(this, 'activate');

	goog.array.forEach(this._fieldEls, function(fieldEl) {
		this._eventHandler.listen(fieldEl, goog.events.EventType.CHANGE, this.dispatchEvent, false, this);
	}, this);

	this._eventHandler.listen(this._toggleButton, goog.events.EventType.CLICK, this.dispatchEvent, false, this);
	this._eventHandler.listen(this._closeButton, goog.events.EventType.CLICK, this.dispatchEvent, false, this);
};


btr.views.components.EditorWindow.prototype.toggle = function() {

	if(goog.dom.classlist.contains(this.element, 'hide-property')) {
		this.expand();
	}else {
		this.collapse();
	}
};


btr.views.components.EditorWindow.prototype.expand = function() {

	goog.dom.classlist.enable(this.element, 'hide-property', false);
};


btr.views.components.EditorWindow.prototype.collapse = function() {

	goog.dom.classlist.enable(this.element, 'hide-property', true);
};