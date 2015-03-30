goog.provide('btr.controllers.basics.ComponentGroup');

goog.require('goog.array');
goog.require('btr.models.Component');
goog.require('btr.controllers.basics.Element');


/**
 * Basic component controller, listen for model(data) changes and update its view.
 * @constructor
 * @param {string} groupName The group name
 * @param {Array.<string>} componentNames The component names
 */
btr.controllers.basics.ComponentGroup = function( groupName, componentNames ) {

	goog.base(this);

	this.name = groupName;

	this._components = {};

	goog.array.forEach(componentNames, function(componentName) {

		var model = new btr.models.Component( componentName );
		var constructor = btr.config.constructors.controllers[model.name];
		var component = this.createComponent( constructor, model );

		this._components[component.name] = component;
	}, this);
};
goog.inherits(btr.controllers.basics.ComponentGroup, btr.controllers.basics.Element);


btr.controllers.basics.ComponentGroup.prototype.createComponent = function(constructor, model) {

	var component = new constructor(model);
	return component;
};


btr.controllers.basics.ComponentGroup.prototype.getComponent = function(name) {

	return this._components[name];
};


btr.controllers.basics.ComponentGroup.prototype.doActivate = function() {

	goog.base(this, 'doActivate');

	goog.object.forEach(this._components, function(component) {
		component.activate();
	});
};


btr.controllers.basics.ComponentGroup.prototype.doDeactivate = function() {

	goog.base(this, 'doDeactivate');

	goog.object.forEach(this._components, function(component) {
		component.deactivate();
	});
};


btr.controllers.basics.ComponentGroup.prototype.disposeInternal = function() {

	goog.object.forEach(this._components, function(component) {
		component.dispose();
	});

	goog.base(this, 'disposeInternal');
};


btr.controllers.basics.ComponentGroup.prototype.add = function() {

	goog.base(this, 'add');

	goog.object.forEach(this._components, function(component) {
		component.add();
	});
};


btr.controllers.basics.ComponentGroup.prototype.remove = function() {

	goog.base(this, 'remove');

	goog.object.forEach(this._components, function(component) {
		component.remove();
	});
};