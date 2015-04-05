goog.provide('btr.controllers.test.ControlRenderer');

goog.require('goog.ui.registry');
goog.require('goog.ui.ControlRenderer');


/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
btr.controllers.test.ControlRenderer = function() {
    goog.base(this);
};

goog.inherits(btr.controllers.test.ControlRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(btr.controllers.test.ControlRenderer);


btr.controllers.test.ControlRenderer.CSS_CLASS = 'component';


btr.controllers.test.ControlRenderer.prototype.getCssClass = function() {
    return btr.controllers.test.ControlRenderer.CSS_CLASS;
};


/**
 * Register control to CSS class name
 */
goog.ui.registry.setDecoratorByClassName(
    btr.controllers.test.ControlRenderer.CSS_CLASS,
    function() {
        return new app.Control();
    }
);