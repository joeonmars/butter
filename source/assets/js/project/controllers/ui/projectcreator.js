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

	this._project = null;
	this._ready = null;
	this._cancel = null;

	this.addObservationPath('width', 'width.value');
	this.addObservationPath('height', 'height.value');
	this.addObservationPath('title', 'title');
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
};


btr.controllers.ui.ProjectCreator.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();
	handler.listen( this._okButton, goog.events.EventType.CLICK, this.onClickOk, false, this );
	handler.listen( this._cancelButton, goog.events.EventType.CLICK, this.onClickCancel, false, this );

	var inputEls = goog.dom.query('input', this.getElement());
	goog.array.forEach(inputEls, function(inputEl) {
		handler.listen( inputEl, goog.events.EventType.CHANGE, this.onInputChange, false, this );
	}, this);
};


btr.controllers.ui.ProjectCreator.prototype.setProject = function( project, ready, cancel ) {

	this._project = project;
	this._ready = ready;
	this._cancel = cancel;

	var inputEls = goog.dom.query('input', this.getElement());
	goog.array.forEach(inputEls, function(inputEl) {
		this.handleDataChange( inputEl.name, inputEl.value );
	}, this);
};


btr.controllers.ui.ProjectCreator.prototype.onClickOk = function(e) {

	if(this._ready) {
		this._ready();
	}
};


btr.controllers.ui.ProjectCreator.prototype.onClickCancel = function(e) {

	if(this._cancel) {
		this._cancel();
	}
};


btr.controllers.ui.ProjectCreator.prototype.onInputChange = function(e) {

	var name = e.target.name;
	var value = e.target.value;

	if(name === 'width' || name === 'height') {
		this.model.setValue( name, value );
	}else {
		this.model.set( name, value );
	}
};


btr.controllers.ui.ProjectCreator.prototype.handleDataChange = function( name, value, oldValue ) {

	if(!this._project) {
		return;
	}

	if(name === 'title') {
		this._project.set('title', value);

		var id = value.toLowerCase().split(' ').join('_') + '_' + goog.now();
		this._project.setId(id, true);
	}

	if(name === 'width') {
		this._project.set('width', parseFloat(value));
	}

	if(name === 'height') {
		this._project.set('height', parseFloat(value));
	}
};