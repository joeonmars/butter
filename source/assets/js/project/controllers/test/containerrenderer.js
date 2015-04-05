goog.provide('btr.controllers.test.ContainerRenderer');

goog.require('goog.ui.ContainerRenderer');


/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
btr.controllers.test.ContainerRenderer = function() {

    goog.base(this);
};

goog.inherits(btr.controllers.test.ContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(btr.controllers.test.ContainerRenderer);


btr.controllers.test.ContainerRenderer.prototype.getCssClass = function() {

    return btr.controllers.test.ContainerRenderer.CSS_CLASS;
};


btr.controllers.test.ContainerRenderer.CSS_CLASS = 'container';