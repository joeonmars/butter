goog.provide('btr.controllers.test.Element');

goog.require('goog.array');


/**
 * Basic board element.
 * @constructor
 * @param {string|btr.models.Model} model The ID for generating the model, or the model itself.
 * @param {string|Element} child The ID of the template for generating the element, or the element itself.
 * @param {null|Element} opt_rootElement The optional root element to render template.
 * @extends {goog.ui.Control}
 */
btr.controllers.test.Element = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

};
goog.inherits(btr.controllers.test.Element, btr.controllers.test.Control);


btr.controllers.test.Element.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');
};


btr.controllers.test.Element.prototype.deactivateInternal = function() {

	goog.base(this, 'deactivateInternal');
};


btr.controllers.test.Element.prototype.onDataChange = function(changes) {

	goog.base(this, 'onDataChange', changes);
};