goog.provide('btr.controllers.basics.ControlRenderer');

goog.require('goog.ui.registry');
goog.require('goog.ui.ControlRenderer');


/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
btr.controllers.basics.ControlRenderer = function() {
    goog.base(this);
};

goog.inherits(btr.controllers.basics.ControlRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(btr.controllers.basics.ControlRenderer);


btr.controllers.basics.ControlRenderer.CSS_CLASS = 'component';


btr.controllers.basics.ControlRenderer.prototype.getCssClass = function() {
    return btr.controllers.basics.ControlRenderer.CSS_CLASS;
};