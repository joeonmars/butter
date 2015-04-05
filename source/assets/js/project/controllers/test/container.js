goog.provide('btr.controllers.test.Container');

goog.require('goog.ui.Container');
goog.require('btr.controllers.test.ContainerRenderer');

/**
 * @param {?goog.ui.Container.Orientation=} opt_orientation
 * @constructor
 * @extends {goog.ui.Container}
 */
btr.controllers.test.Container = function(opt_orientation) {

	var renderer = btr.controllers.test.ContainerRenderer.getInstance();

    goog.base(this, opt_orientation, renderer);

};

goog.inherits(btr.controllers.test.Container, goog.ui.Container);