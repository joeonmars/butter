goog.provide('btr.controllers.elements.BoardGroup');

goog.require('goog.style');
goog.require('goog.math.Size');
goog.require('btr.controllers.basics.Element');


/**
 * Board Group, included components:
 * Board, Grid
 * @constructor
 */
btr.controllers.elements.BoardGroup = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._size = new goog.math.Size();
	this._boardEl = goog.dom.getElementByClass('board', this.getElement());

	this.addObservationPath('width', 'width.value');
	this.addObservationPath('height', 'height.value');
	this.addObservationPath('background', 'background.value');
};
goog.inherits(btr.controllers.elements.BoardGroup, btr.controllers.basics.Element);


btr.controllers.elements.BoardGroup.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');
	
};


btr.controllers.elements.BoardGroup.prototype.setIndex = function(index) {

	this.model.set('index', index);
};


btr.controllers.elements.BoardGroup.prototype.setSize = function(opt_width, opt_height) {

	this._size.width = opt_width ? opt_width : this._size.width;
	this._size.height = opt_height ? opt_height : this._size.height;

	goog.style.setSize(this._boardEl, this._size);
};


btr.controllers.elements.BoardGroup.prototype.setBackgroundColor = function(hex) {

	goog.style.setStyle(this._boardEl, 'background-color', hex);
};


btr.controllers.elements.BoardGroup.prototype.handleDataChange = function( name, value, oldValue ) {

	if(name === 'width') {
		this.setSize( value, null );
	}

	if(name === 'height') {
		this.setSize( null, value );
	}

	if(name === 'background') {
		this.setBackgroundColor( value );
	}
};