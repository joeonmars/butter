goog.provide('btr.controllers.basics.UIRenderer');

goog.require('goog.ui.registry');
goog.require('goog.ui.ControlRenderer');


/**
 * @constructor
 * @extends {goog.ui.UIRenderer}
 */
btr.controllers.basics.UIRenderer = function() {
    goog.base(this);
};

goog.inherits(btr.controllers.basics.UIRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(btr.controllers.basics.UIRenderer);


btr.controllers.basics.UIRenderer.CSS_CLASS = 'ui';


btr.controllers.basics.UIRenderer.prototype.getCssClass = function() {
    return btr.controllers.basics.UIRenderer.CSS_CLASS;
};