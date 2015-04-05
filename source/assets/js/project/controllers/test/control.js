goog.provide('btr.controllers.test.Control');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.ui.Control');
goog.require('btr.controllers.test.ControlRenderer');
goog.require('btr.controllers.test.Constructors');
goog.require('btr.models.Model');


/**
 * Basic component control, listen for model(data) changes and update its view.
 * Extension pattern refers to http://www.closurecheatsheet.com/ui
 * @constructor
 * @param {string|btr.models.Model} model The ID for generating the model, or the model itself.
 * @param {string|Element} child The ID of the template for generating the element, or the element itself.
 * @param {null|Element} opt_rootElement The optional root element to render template.
 * @extends {goog.ui.Control}
 */
btr.controllers.test.Control = function( model, view, opt_rootElement ) {

	goog.base(this);

	this.model = goog.isString(model) ? new btr.models.Model( model ) : model;

	this.setId( this.model.id );

	this.createDom( view, opt_rootElement );

	this.createChildComponents();

	this.setAllowTextSelection( true );
	//this.setSupportedState( goog.ui.Component.State.ALL, false );

	this._isActive = false;

	this._onDataChange = goog.bind(this.onDataChange, this);
};
goog.inherits(btr.controllers.test.Control, goog.ui.Control);


btr.controllers.test.Control.prototype.createDom = function( view, opt_rootElement ) {

	var element = goog.isString(view) ? this.createElementByModelAndTemplate( this.model, view, opt_rootElement ) : view;

    this.decorateInternal(element);
};


btr.controllers.test.Control.prototype.createChildComponents = function() {

	// only get the immediate component elements
	var componentEls = goog.dom.query('> .component', this.getElement());

	goog.array.forEach( componentEls, function(el) {
		
		var component = this.createChildComponent( el );
		this.addChild( component, true );

	}, this);
};


btr.controllers.test.Control.prototype.createChildComponent = function(element) {

    return btr.controllers.test.Control.createComponentFromElement( element );
};


btr.controllers.test.Control.prototype.decorateInternal = function(element) {

    goog.base(this, 'decorateInternal', element);

    var element = this.getElement();
    element.removeAttribute('data-model');
    element.removeAttribute('data-view');
    element.removeAttribute('data-control');
};


btr.controllers.test.Control.prototype.createElementByModelAndTemplate = function( model, templateId, opt_rootElement ) {

	var mapping = btr.controllers.test.Constructors.templates;

	var template = mapping[templateId] || btr.templates.Test.Component;

	var templateData = {
		data: this.model.getDefaultData()
	};

	var renderElement = soy.renderAsFragment( template, templateData );

	if(opt_rootElement) {

		element = opt_rootElement;
		goog.dom.appendChild(element, goog.dom.htmlToDocumentFragment(renderElement.innerHTML));

	}else {

		element = renderElement;
	}

	return element;
};


btr.controllers.test.Control.prototype.enterDocument = function() {

    goog.base(this, 'enterDocument');

    Object.observe(this.model.getData(), this._onDataChange);

    this.activate();
};


btr.controllers.test.Control.prototype.exitDocument = function() {

    goog.base(this, 'exitDocument');

    Object.unobserve(this.model.getData(), this._onDataChange);

    this.deactivate();
};


btr.controllers.test.Control.prototype.activate = function() {

	if(this.isActive) {

		return;

	}else {

		this.isActive = true;
		this.activateInternal();
	}
};


btr.controllers.test.Control.prototype.deactivate = function() {

	if(!this.isActive) {
		
		return;

	}else {

		this.isActive = false;
		this.deactivateInternal();
	}
};


btr.controllers.test.Control.prototype.activateInternal = function() {
};


btr.controllers.test.Control.prototype.deactivateInternal = function() {
};


btr.controllers.test.Control.prototype.onDataChange = function(changes) {
};


btr.controllers.test.Control.createComponentFromElement = function(element) {

	var model = element.getAttribute('data-model');
	var view = element.hasAttribute('data-view') ? element.getAttribute('data-view') : element;
	var control = element.hasAttribute('data-control') ? element.getAttribute('data-control') : null;

	var rootElement = goog.isString(view) ? element : null;

	var mapping = btr.controllers.test.Constructors.controls;

	var ctor = mapping[control] || btr.controllers.test.Control;

	var component = new ctor( model, view, rootElement );

	return component;
};


/**
 * Default renderer
 */
goog.ui.registry.setDefaultRenderer(
    btr.controllers.test.Control, btr.controllers.test.ControlRenderer
);