goog.provide('btr.controllers.basics.Control');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.ui.Control');
goog.require('btr.controllers.basics.ControlRenderer');
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
btr.controllers.basics.Control = function( model, view, opt_rootElement ) {

	goog.base(this);

	this.model = goog.isString(model) ? new btr.models.Model( model ) : model;

	this.setId( this.model.name );

	this.createDom( view, opt_rootElement );

	this.createChildComponents();

	this.setAllowTextSelection( true );
	//this.setSupportedState( goog.ui.Component.State.ALL, false );

	this._isActive = false;

	this.isShortcutEnabled = this.isShortcutEnabled || false;

	this._onDataChange = goog.bind(this.onDataChange, this);
	this._handleShortcut = goog.bind(this.handleShortcut, this);
};
goog.inherits(btr.controllers.basics.Control, goog.ui.Control);


btr.controllers.basics.Control.prototype.createDom = function( view, opt_rootElement ) {

	var element = goog.isString(view) ? this.createElementByModelAndTemplate( this.model, view, opt_rootElement ) : view;

    this.decorateInternal(element);
};


btr.controllers.basics.Control.prototype.createChildComponents = function() {

	// only get the immediate component elements
	var componentEls = goog.dom.query('> .component', this.getElement());

	goog.array.forEach( componentEls, function(el) {

		this.createChildComponent( el );

	}, this);
};


btr.controllers.basics.Control.prototype.createChildComponent = function(element) {

    var component = btr.controllers.basics.Control.createComponentFromElement( element );
    this.addChild( component, true );
};


btr.controllers.basics.Control.prototype.decorateInternal = function(element) {

    goog.base(this, 'decorateInternal', element);

    var element = this.getElement();
    element.removeAttribute('data-model');
    element.removeAttribute('data-view');
    element.removeAttribute('data-control');
};


btr.controllers.basics.Control.prototype.createElementByModelAndTemplate = function( model, templateId, opt_rootElement ) {

	var mapping = btr.controllers.basics.Constructors.templates;

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


btr.controllers.basics.Control.prototype.enterDocument = function() {

    goog.base(this, 'enterDocument');

    Object.observe(this.model.getData(), this._onDataChange);

    this.activate();
};


btr.controllers.basics.Control.prototype.exitDocument = function() {

    goog.base(this, 'exitDocument');

    Object.unobserve(this.model.getData(), this._onDataChange);

    this.deactivate();
};


btr.controllers.basics.Control.prototype.setPosition = function(x, y) {

	goog.style.setPosition(this.getElement(), x, y);
};


btr.controllers.basics.Control.prototype.toggleVisible = function() {

	if(this.isVisible()) {
		this.setVisible(false);
	}else {
		this.setVisible(true);
	}
};


btr.controllers.basics.Control.prototype.activate = function() {

	if(this._isActive) {

		return;

	}else {

		this._isActive = true;
		this.activateInternal();
	}
};


btr.controllers.basics.Control.prototype.deactivate = function() {

	if(!this._isActive) {
		
		return;

	}else {

		this._isActive = false;
		this.deactivateInternal();
	}
};


btr.controllers.basics.Control.prototype.activateInternal = function() {

	this.refreshData();

	if(this.isShortcutEnabled) {
		this.refreshShortcuts();
	}
};


btr.controllers.basics.Control.prototype.deactivateInternal = function() {

	var shortcuts = this.model.get('shortcuts');

  	if(this.isShortcutEnabled && shortcuts) {

  		goog.array.forEach(shortcuts, function(name) {
  			btr.shortcuts.unregister(name);
  		});
  	}
};


btr.controllers.basics.Control.prototype.refreshData = function() {

	goog.object.forEach(this.model.getData(), function(value, key) {
		this.handleDataChange(key, value);
    }, this);
};


btr.controllers.basics.Control.prototype.refreshShortcuts = function() {

    var shortcuts = this.model.get('shortcuts');

  	if(shortcuts) {
  		goog.array.forEach(shortcuts, function(name) {
  			btr.shortcuts.register(name, this._handleShortcut);
  		}, this);
  	}
};


btr.controllers.basics.Control.prototype.handleShortcut = function(id) {

	console.log(id);
};


btr.controllers.basics.Control.prototype.handleContextMenu = function(e) {

	console.log('Handle context menu: ' + this.getId());
};


btr.controllers.basics.Control.prototype.handleDataChange = function( name, value, oldValue ) {
};


btr.controllers.basics.Control.prototype.onDataChange = function(changes) {

	goog.array.forEach(changes, function(change) {

		var name = change.name;
		var value = change.object[change.name];
		var oldValue = change.oldValue;

        this.handleDataChange(name, value, oldValue);

    }, this);
};


btr.controllers.basics.Control.createComponentFromElement = function(element) {

	var model = element.getAttribute('data-model');
	var view = element.hasAttribute('data-view') ? element.getAttribute('data-view') : element;
	var control = element.hasAttribute('data-control') ? element.getAttribute('data-control') : null;

	var rootElement = goog.isString(view) ? element : null;

	return btr.controllers.basics.Control.createComponent(model, view, control, rootElement);
};


btr.controllers.basics.Control.createComponent = function(model, view, control, opt_rootElement) {

	var mapping = btr.controllers.basics.Constructors.controls;

	var ctor = mapping[control] || btr.controllers.basics.Control;

	var component = new ctor( model, view, opt_rootElement );

	return component;
};


/**
 * Default renderer
 */
goog.ui.registry.setDefaultRenderer(
    btr.controllers.basics.Control, btr.controllers.basics.ControlRenderer
);