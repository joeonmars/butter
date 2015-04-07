goog.provide('btr.controllers.elements.Grid');

goog.require('goog.color');
goog.require('btr.controllers.basics.Control');


/**
 * Grid component controller.
 * @constructor
 */
btr.controllers.elements.Grid = function( model, view, opt_rootElement ) {

	goog.base(this, model, view, opt_rootElement );

	this.isShortcutEnabled = true;

	this._canvas = new goog.dom.createDom('canvas');

	this.addObservationPath('size', 'size.value');
	this.addObservationPath('color', 'color.value');
	this.addObservationPath('opacity', 'opacity.value');
};
goog.inherits(btr.controllers.elements.Grid, btr.controllers.basics.Control);


btr.controllers.elements.Grid.prototype.handleShortcut = function(id) {

	goog.base(this, 'handleShortcut', id);

	if(id === 'toggle-grid') {
		this.toggleVisible();
	}
};


btr.controllers.elements.Grid.prototype.draw = function(opt_size, opt_opacity, opt_color) {

	var size = opt_size ? opt_size : this.model.getValue('size');
	var opacity = opt_opacity ? opt_opacity : this.model.getValue('opacity');
	var color = opt_color ? opt_color : this.model.getValue('color');

	var rgb = goog.color.hexToRgb(color);

	this._canvas.width = size;
	this._canvas.height = size;

	var ctx = this._canvas.getContext('2d');
	ctx.strokeStyle = "rgba(" + rgb.join(',') + "," + opacity + ")";
	ctx.strokeRect(-1, -1, size+1, size+1);

	ctx.fillStyle = "rgba(" + rgb.join(',') + ", 1)";
	ctx.fillRect(size-1, size-1, 1, 1);

	goog.style.setStyle(this.getElement(), 'background-image', 'url('+this._canvas.toDataURL()+')');
};


btr.controllers.elements.Grid.prototype.handleDataChange = function( name, value, oldValue ) {

	if(name === 'size') {
		this.draw( value, null, null );
	}

	if(name === 'opacity') {
		this.draw( null, value, null );
	}

	if(name === 'color') {
		this.draw( null, null, value );
	}
};