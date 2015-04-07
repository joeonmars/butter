goog.provide('btr.controllers.globals.ProjectManager');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('btr.events');
goog.require('btr.models.Project');


/**
 * The global project controller. Takes change of creating/opening/saving/exiting any project,
 * And the current project's life cycle.
 * @constructor
 */
btr.controllers.globals.ProjectManager = function() {

	goog.base(this);
	/*
	this._saveInput = goog.dom.createDom('input', {
		'type': 'file',
		'accept': '.butter',
		'nwworkingdir': '/home/path/',
		'nwsaveas': 'Untitled.butter'
	});
	*/
	this._currentProject = null;
	this._eventHandler = new goog.events.EventHandler(this);
};
goog.inherits(btr.controllers.globals.ProjectManager, goog.events.EventTarget);
goog.addSingletonGetter(btr.controllers.globals.ProjectManager);


btr.controllers.globals.ProjectManager.prototype.getCurrentProject = function() {

	return this._currentProject;
};


btr.controllers.globals.ProjectManager.prototype.create = function() {

	this._currentProject = new btr.models.Project();

	this.dispatchEvent({
		type: btr.events.EventType.CREATE,
		project: this._currentProject,
		done: goog.bind(this.onCreateComplete, this),
		cancel: goog.bind(this.onCreateCancel, this)
	});
};


btr.controllers.globals.ProjectManager.prototype.open = function() {

	
};


btr.controllers.globals.ProjectManager.prototype.save = function() {

	var title = 'test';
	this._saveInput.setAttribute('nwsaveas', title + '.butter' );
};


btr.controllers.globals.ProjectManager.prototype.close = function() {

	
};


btr.controllers.globals.ProjectManager.prototype.onCreateComplete = function() {


};


btr.controllers.globals.ProjectManager.prototype.onCreateCancel = function() {


};