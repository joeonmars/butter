goog.provide('btr.controllers.ui.ProjectCreator');

goog.require('btr.controllers.basics.UI');
goog.require('btr.templates.Main');


/**
 * The project creator UI.
 * @constructor
 */
btr.controllers.ui.ProjectCreator = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._okButton = null;
	this._cancelButton = null;
	this._titleInput = null;
	this._widthInput = null;
	this._heightInput = null;
};
goog.inherits(btr.controllers.ui.ProjectCreator, btr.controllers.basics.UI);


btr.controllers.ui.ProjectCreator.prototype.decorateInternal = function(element) {

    goog.base(this, 'decorateInternal', element);

    soy.renderElement(this.getElement(), btr.templates.Main.ProjectCreator, {
    	data: this.model.getData()
    });
};


btr.controllers.ui.ProjectCreator.prototype.initialize = function() {

	goog.base(this, 'initialize');

	var element = this.getElement();
	this._okButton = goog.dom.getElementByClass('ok', element);
	this._cancelButton = goog.dom.getElementByClass('cancel', element);
	this._widthInput = goog.dom.getElementByClass('width', element);
	this._heightInput = goog.dom.getElementByClass('height', element);
	this._titleInput = goog.dom.getElementByClass('title', element);
};


btr.controllers.ui.ProjectCreator.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();
	//handler.listen(  )
};


btr.controllers.ui.ProjectCreator.prototype.setProject = function( project, done, cancel ) {

	//project.set('title', this._titleInput.value);
};