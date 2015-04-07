goog.provide('btr.controllers.basics.UI');

goog.require('goog.dom');
goog.require('btr.controllers.basics.Control');
goog.require('btr.controllers.basics.UIRenderer');


/**
 * The basic UI element.
 * @constructor
 */
btr.controllers.basics.UI = function( model, view, opt_rootElement ) {

	this.isShortcutEnabled = true;

	goog.base( this, model, view, opt_rootElement );
};
goog.inherits(btr.controllers.basics.UI, btr.controllers.basics.Control);


/**
 * Default renderer
 */
goog.ui.registry.setDefaultRenderer(
    btr.controllers.basics.UI, btr.controllers.basics.UIRenderer
);