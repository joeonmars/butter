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

	this.isShown = false;
	this.isActive = false;

	this._eventHandler = new goog.events.EventHandler(this);
	this._onDataChange = goog.bind(this.onDataChange, this);
};
goog.inherits(btr.controllers.basics.Controller, goog.events.EventTarget);


btr.controllers.basics.Controller.prototype.activate = function() {

	if(this.isActive) {

		return;

	}else {

		this.isActive = true;
		this.doActivate();
	}
};


btr.controllers.basics.Controller.prototype.deactivate = function() {

	if(!this.isActive) {
		
		return;

	}else {

		this.isActive = false;
		this.doDeactivate();
	}
};


btr.controllers.basics.Controller.prototype.disposeInternal = function() {

	this.deactivate();
	this._eventHandler.dispose();
	
	this.model.dispose();

	goog.base(this, 'disposeInternal');
};


btr.controllers.basics.Controller.prototype.add = function() {

	this.isShown = true;

	Object.observe(this.model.getData(), this._onDataChange);
};


btr.controllers.basics.Controller.prototype.remove = function() {

	this.isShown = false;

	Object.unobserve(this.model.getData(), this._onDataChange);
};


btr.controllers.basics.Controller.prototype.doActivate = function() {

};


btr.controllers.basics.Controller.prototype.doDeactivate = function() {

	this._eventHandler.removeAll();
};


btr.controllers.basics.Controller.prototype.onDataChange = function(changes) {

};