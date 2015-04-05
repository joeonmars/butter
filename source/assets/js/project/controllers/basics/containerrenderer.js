goog.provide('btr.controllers.basics.ContainerRenderer');

goog.require('goog.ui.ContainerRenderer');


/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
btr.controllers.basics.ContainerRenderer = function() {

    goog.base(this);
};

goog.inherits(btr.controllers.basics.ContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(btr.controllers.basics.ContainerRenderer);


btr.controllers.basics.ContainerRenderer.prototype.getCssClass = function() {

    return btr.controllers.basics.ContainerRenderer.CSS_CLASS;
};


btr.controllers.basics.ContainerRenderer.CSS_CLASS = 'container';