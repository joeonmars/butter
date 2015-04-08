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
	this._isInitialized = false;

	this.isShortcutEnabled = this.isShortcutEnabled || false;

	this._observer = new CompoundObserver();
	this._observerDataNames = [];
	this._observerDataPaths = [];

	this._handleShortcut = goog.bind(this.handleShortcut, this);
};
goog.inherits(btr.controllers.basics.Control, goog.ui.Control);


btr.controllers.basics.Control.prototype.createDom = function( view, opt_rootElement ) {

	var element = goog.isString(view) ? this.createElementByModelAndTemplate( this.model, view, opt_rootElement ) : view;

    this.decorateInternal(element);
};


btr.controllers.basics.Control.prototype.createChildComponents = function() {

	// Check the element structure recursively to get
	// the most immediate component elements by classname
	var cssClass = this.getRenderer().getCssClass();
	var componentEls = [];

	var parseComponentElements = function(el) {

		var children = goog.dom.getChildren(el);
		if(children.length === 0) {
			return;
		}

		var results = goog.dom.query('> .' + cssClass, el);

		if(results.length === 0) {
			goog.array.forEach(children, function(child) {
				parseComponentElements(child);
			});
		}else {
			componentEls.push.apply( componentEls, results );
		}
	};

	parseComponentElements( this.getElement() );

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

		if(!this._isInitialized) {

			this.initialize();
			this._isInitialized = true;
		}
};


btr.controllers.basics.Control.prototype.exitDocument = function() {

    goog.base(this, 'exitDocument');

    this.deactivate();
};


btr.controllers.basics.Control.prototype.initialize = function() {
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

	this.startObservation();

	this.applyData();

	if(this.isShortcutEnabled) {
		this.refreshShortcuts();
	}
};


btr.controllers.basics.Control.prototype.deactivateInternal = function() {

	this.stopObservation();

	var shortcuts = this.model.get('shortcuts');

  	if(this.isShortcutEnabled && shortcuts) {

  		goog.array.forEach(shortcuts, function(name) {
  			btr.shortcuts.unregister(name);
  		});
  	}
};


btr.controllers.basics.Control.prototype.addObservationPath = function( name, path ) {

	this._observerDataNames.push(name);
	this._observerDataPaths.push(path);

	this._observer.addPath( this.model.getData(), path );
};


btr.controllers.basics.Control.prototype.startObservation = function() {

	this._observer.open( goog.bind(function(newValues, oldValues) {

		for (var i in oldValues) {

			var name = this._observerDataNames[ i ];
			var oldValue = oldValues[i];
			var newValue = newValues[i];

			console.log(name + ' changed from: ' + oldValue + ' to: ' + newValue);

			this.handleDataChange( name, newValue, oldValue );
		}

	}, this) );
};


btr.controllers.basics.Control.prototype.stopObservation = function() {

	this._observer.close();
};


btr.controllers.basics.Control.prototype.applyData = function() {

	var data = this.model.getData();

	goog.array.forEach(this._observerDataPaths, function(path, index) {
		var name = this._observerDataNames[index];
		var value = Path.get(path).getValueFrom(data);
		this.handleDataChange( name, value );
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


btr.controllers.basics.Control.createComponentFromElement = function(element) {

	var model = element.getAttribute('data-model');
	var view = element.hasAttribute('data-view') ? element.getAttribute('data-view') : element;
	var control = element.hasAttribute('data-control') ? element.getAttribute('data-control') : null;

	var rootElement = goog.isString(view) ? element : null;

	return btr.controllers.basics.Control.createComponent(model, view, control, rootElement);
};


btr.controllers.basics.Control.createComponent = function(model, view, control, opt_rootElement) {

	var mapping = btr.controllers.basics.Constructors.controllers;

	var ctor = mapping[control];

	if(!ctor) {
		if(goog.dom.classlist.contains(view, 'ui')) {
			ctor = btr.controllers.basics.UI;
		}else {
			ctor = btr.controllers.basics.Control;
		}
	}

	var component = new ctor( model, view, opt_rootElement );

	return component;
};


/**
 * Default renderer
 */
goog.ui.registry.setDefaultRenderer(
    btr.controllers.basics.Control, btr.controllers.basics.ControlRenderer
);