goog.provide('btr.controllers.basics.Element');

goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');


/**
 * Basic element controller.
 * @constructor
 */
btr.controllers.basics.Element = function() {

	goog.base(this);

	this.isShown = false;
	this.isActive = false;

	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(btr.controllers.basics.Element, goog.events.EventTarget);


btr.controllers.basics.Element.prototype.activate = function() {

	if(this.isActive) {

		return;

	}else {

		this.isActive = true;
		this.doActivate();
	}
};


btr.controllers.basics.Element.prototype.deactivate = function() {

	if(!this.isActive) {
		
		return;

	}else {

		this.isActive = false;
		this.doDeactivate();
	}
};


btr.controllers.basics.Element.prototype.disposeInternal = function() {

	this.deactivate();
	this._eventHandler.dispose();
	
	goog.base(this, 'disposeInternal');
};


btr.controllers.basics.Element.prototype.add = function() {

	this.isShown = true;
};


btr.controllers.basics.Element.prototype.remove = function() {

	this.isShown = false;
};


btr.controllers.basics.Element.prototype.doActivate = function() {

};


btr.controllers.basics.Element.prototype.doDeactivate = function() {

	this._eventHandler.removeAll();
};