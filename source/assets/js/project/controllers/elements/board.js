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

};
goog.inherits(btr.controllers.elements.Board, btr.controllers.basics.Element);