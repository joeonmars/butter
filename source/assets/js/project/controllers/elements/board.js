goog.provide('btr.controllers.elements.Board');

goog.require('goog.style');
goog.require('goog.math.Size');
goog.require('btr.controllers.basics.Element');


/**
 * Basic board controller.
 * @constructor
 */
btr.controllers.elements.Board = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );
	
	this._size = new goog.math.Size();
};
goog.inherits(btr.controllers.elements.Board, btr.controllers.basics.Element);


btr.controllers.elements.Board.prototype.setSize = function(opt_width, opt_height) {

	this._size.width = opt_width ? opt_width : this._size.width;
	this._size.height = opt_height ? opt_height : this._size.height;

	goog.style.setSize(this.getElement(), this._size);
};


btr.controllers.elements.Board.prototype.setBackgroundColor = function(hex) {

	goog.style.setStyle(this.getElement(), 'background-color', hex);
};


btr.controllers.elements.Board.prototype.handleDataChange = function( name, value, oldValue ) {

	if(name === 'width') {
		this.setSize( value, null );
	}

	if(name === 'height') {
		this.setSize( null, value );
	}

	if(name === 'background-color') {
		this.setBackgroundColor( value );
	}
};