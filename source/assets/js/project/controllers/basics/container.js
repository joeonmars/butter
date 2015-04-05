goog.provide('btr.controllers.basics.Container');

goog.require('goog.ui.Container');
goog.require('btr.controllers.basics.ContainerRenderer');

/**
 * @param {?goog.ui.Container.Orientation=} opt_orientation
 * @constructor
 * @extends {goog.ui.Container}
 */
btr.controllers.basics.Container = function(opt_orientation) {

	var renderer = btr.controllers.basics.ContainerRenderer.getInstance();

    goog.base(this, opt_orientation, renderer);

};

goog.inherits(btr.controllers.basics.Container, goog.ui.Container);