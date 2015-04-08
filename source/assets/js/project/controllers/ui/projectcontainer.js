goog.provide('btr.controllers.ui.ProjectContainer');

goog.require('btr.controllers.basics.UI');


/**
 * The project container UI.
 * @constructor
 */
btr.controllers.ui.ProjectContainer = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._projectCreator = null;
	this._projectWorkspace = null;
};
goog.inherits(btr.controllers.ui.ProjectContainer, btr.controllers.basics.UI);


btr.controllers.ui.ProjectContainer.prototype.initialize = function() {

	goog.base(this, 'initialize');

	this._projectCreator = this.getChild('project-creator');
	this._projectWorkspace = this.getChild('project-workspace');

	this._projectCreator.setVisible(false);
	this._projectWorkspace.setVisible(false);
};


btr.controllers.ui.ProjectContainer.prototype.enterDocument = function() {

	goog.base(this, 'enterDocument');

	this.activate();
};


btr.controllers.ui.ProjectContainer.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();
	handler.listen( btr.projectManager, btr.events.EventType.CREATE, this.onProjectCreate, false, this );
	handler.listen( btr.projectManager, btr.events.EventType.CREATE_COMPLETE, this.onProjectCreateComplete, false, this );
};


btr.controllers.ui.ProjectContainer.prototype.onProjectCreate = function(e) {

	/*
	this._projectWorkspace.setVisible(true);
	this._projectWorkspace.activate();

	for(var i = 0; i < 1; i++) {

		var boardGroup = new btr.controllers.elements.BoardGroup('board', 'board-group');
		boardGroup.render( goog.dom.getElement('board-container') );
		boardGroup.activate();

		btr.boardManager.addBoard( boardGroup );
	}
	*/

	this._projectCreator.setVisible(true);
	this._projectCreator.activate();
	this._projectCreator.setProject( e.project, e.ready, e.cancel );
};


btr.controllers.ui.ProjectContainer.prototype.onProjectCreateComplete = function(e) {

	this._projectWorkspace.setVisible(true);
	this._projectWorkspace.activate();

	for(var i = 0; i < 1; i++) {

		var boardGroup = new btr.controllers.elements.BoardGroup('board', 'board-group');
		boardGroup.render( goog.dom.getElement('board-container') );
		boardGroup.activate();

		btr.boardManager.addBoard( boardGroup );
	}

	this._projectCreator.setVisible(false);
	this._projectCreator.deactivate();
};