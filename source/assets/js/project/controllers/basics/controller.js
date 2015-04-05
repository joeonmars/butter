goog.provide('btr.controllers.basics.Controller');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('btr.models.Model');


/**
 * Basic controller, bound with a dynamic or static model.
 * @constructor
 */
btr.controllers.basics.Controller = function(name, opt_model) {

	goog.base(this);

	this.model = opt_model || new btr.models.Model( name );
	this.id = this.model.id;
	this.name = name;

	this._onDataChange = goog.bind(this.onDataChange, this);

	Object.observe(this.model.getData(), this._onDataChange);
};
goog.inherits(btr.controllers.basics.Controller, goog.events.EventTarget);


btr.controllers.basics.Controller.prototype.disposeInternal = function() {

	Object.unobserve(this.model.getData(), this._onDataChange);

	this.model.dispose();

	goog.base(this, 'disposeInternal');
};


btr.controllers.basics.Controller.prototype.onDataChange = function(changes) {

};