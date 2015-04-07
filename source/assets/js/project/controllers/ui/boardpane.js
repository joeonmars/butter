goog.provide('btr.controllers.ui.BoardPane');

goog.require('btr.controllers.basics.UI');


/**
 * The board pane.
 * @constructor
 */
btr.controllers.ui.BoardPane = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );
};
goog.inherits(btr.controllers.ui.BoardPane, btr.controllers.basics.UI);


btr.controllers.ui.BoardPane.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');


};