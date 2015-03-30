goog.provide('btr.controllers.components.Grid');

goog.require('btr.controllers.basics.Component');
goog.require('btr.views.components.Grid');


/**
 * Grid component controller.
 * @constructor
 */
btr.controllers.components.Grid = function( model, opt_view, opt_template, opt_element ) {

	goog.base(this, model, btr.views.components.Grid, null, opt_element );

	this.isShortcutEnabled = true;
	this.isEditable = true;
};
goog.inherits(btr.controllers.components.Grid, btr.controllers.basics.Component);


btr.controllers.components.Grid.prototype.handleShortcut = function(id) {

	goog.base(this, 'handleShortcut', id);

	if(id === 'toggle-grid') {
		if(this.view.isShown) {
			this.view.hide();
		}else {
			this.view.show();
		}
	}
};