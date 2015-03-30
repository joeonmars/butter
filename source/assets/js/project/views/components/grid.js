goog.provide('btr.views.components.Grid');

goog.require('goog.color');
goog.require('goog.dom.classlist');
goog.require('goog.style');
goog.require('btr.views.components.Component');


/**
 * Grid display for board.
 * @constructor
 */
btr.views.components.Grid = function( model, template, opt_element ) {

	goog.base(this, model, template, opt_element);

	this._canvas = new goog.dom.createDom('canvas');
};
goog.inherits(btr.views.components.Grid, btr.views.components.Component);


btr.views.components.Grid.prototype.draw = function(opt_size, opt_opacity, opt_color) {

	var size = opt_size ? opt_size : this.model.getData()['size'];
	var opacity = opt_opacity ? opt_opacity : this.model.getData()['opacity'];
	var color = opt_color ? opt_color : this.model.getData()['color'];
	var rgb = goog.color.hexToRgb(color);

	this._canvas.width = size;
	this._canvas.height = size;

	var ctx = this._canvas.getContext('2d');
	ctx.strokeStyle = "rgba(" + rgb.join(',') + "," + opacity + ")";
	ctx.strokeRect(-1, -1, size+1, size+1);

	ctx.fillStyle = "rgba(" + rgb.join(',') + ", 1)";
	ctx.fillRect(size-1, size-1, 1, 1);

	goog.style.setStyle(this.element, 'background-image', 'url('+this._canvas.toDataURL()+')');
};


btr.views.components.Grid.prototype.onDataChange = function(name, newValue, oldValue) {

	goog.base(this, 'onDataChange', name, newValue, oldValue);

	if(name === 'size') {
		this.draw( newValue, null, null );
	}

	if(name === 'opacity') {
		this.draw( null, newValue, null );
	}

	if(name === 'color') {
		this.draw( null, null, newValue );
	}
};