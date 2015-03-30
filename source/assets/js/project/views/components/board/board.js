goog.provide('btr.views.components.board.Board');

goog.require('goog.style');
goog.require('goog.math.Size');
goog.require('btr.views.components.Component');


/**
 * Base board view.
 * @constructor
 */
btr.views.components.board.Board = function( model, template, opt_element ) {

	goog.base(this, model, template, opt_element);

	this.size = new goog.math.Size();

	this.parentElement = goog.dom.getElement('board-container');
	this.hotspotElement = this.query('.layer.components')[0];
};
goog.inherits(btr.views.components.board.Board, btr.views.components.Component);


btr.views.components.board.Board.prototype.setSize = function(opt_width, opt_height) {

	this.size.width = opt_width ? opt_width : this.size.width;
	this.size.height = opt_height ? opt_height : this.size.height;

	goog.style.setSize(this.element, this.size);
};


btr.views.components.board.Board.prototype.setBackgroundColor = function(hex) {

	goog.style.setStyle(this.element, 'background-color', hex);
};


btr.views.components.board.Board.prototype.onDataChange = function(name, newValue, oldValue) {

	goog.base(this, 'onDataChange', name, newValue, oldValue);

	if(name === 'width') {
		this.setSize( newValue, null );
	}

	if(name === 'height') {
		this.setSize( null, newValue );
	}

	if(name === 'background-color') {
		this.setBackgroundColor( newValue );
	}
};