goog.provide('btr.controllers.ui.NavigationPane');

goog.require('goog.style');
goog.require('goog.dom.classlist');
goog.require('btr.controllers.basics.UI');


/**
 * The navigation pane.
 * @constructor
 */
btr.controllers.ui.NavigationPane = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._unfoldButton = null;
	this._contentContainer = null;
};
goog.inherits(btr.controllers.ui.NavigationPane, btr.controllers.basics.UI);


btr.controllers.ui.NavigationPane.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var element = this.getElement();
	this._unfoldButton = this._unfoldButton || goog.dom.getElementByClass("unfold", element);
	this._contentContainer = this._contentContainer || goog.dom.getElementByClass("content-container", element);

	var handler = this.getHandler();
	handler.listen( this._unfoldButton, goog.events.EventType.CLICK, this.onClickHandle, false, this );
};


btr.controllers.ui.NavigationPane.prototype.getWidth = function() {

	return goog.style.getSize(this._contentContainer).width;
};


btr.controllers.ui.NavigationPane.prototype.onClickHandle = function(e) {

	var element = this.getElement();

	var isFolded = goog.dom.classlist.contains(element, 'fold');

	goog.dom.classlist.enable( element, 'fold', !isFolded );

	this.dispatchEvent(goog.events.EventType.CHANGE);
};