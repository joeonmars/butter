goog.provide('btr.controllers.ui.EditorPane');

goog.require('goog.style');
goog.require('goog.dom.classlist');
goog.require('btr.controllers.basics.UI');


/**
 * The editor pane.
 * @constructor
 */
btr.controllers.ui.EditorPane = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._unfoldButton = null;
	this._contentContainer = null;
};
goog.inherits(btr.controllers.ui.EditorPane, btr.controllers.basics.UI);


btr.controllers.ui.EditorPane.prototype.initialize = function() {

	goog.base(this, 'initialize');

	var element = this.getElement();
	this._unfoldButton = this._unfoldButton || goog.dom.getElementByClass("unfold", element);
	this._contentContainer = this._contentContainer || goog.dom.getElementByClass("content-container", element);
};


btr.controllers.ui.EditorPane.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();
	handler.listen( this._unfoldButton, goog.events.EventType.CLICK, this.onClickHandle, false, this );
};


btr.controllers.ui.EditorPane.prototype.getWidth = function() {

	return goog.style.getSize(this._contentContainer).width;
};


btr.controllers.ui.EditorPane.prototype.onClickHandle = function(e) {

	var element = this.getElement();

	var isFolded = goog.dom.classlist.contains(element, 'fold');

	goog.dom.classlist.enable( element, 'fold', !isFolded );

	this.dispatchEvent(goog.events.EventType.CHANGE);
};