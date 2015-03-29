goog.provide('btr.views.components.board.Board');

goog.require('goog.style');
goog.require('goog.math.Size');
goog.require('btr.views.components.Component');


/**
 * Base board view.
 * @constructor
 * @param {function():*} template The view template
 * @param {btr.models.Component} model The view model
 */
btr.views.components.board.Board = function( template, model ) {

	goog.base(this, template, model);

	this.size = new goog.math.Size();

	this.parentElement = goog.dom.getElement('board-container');
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