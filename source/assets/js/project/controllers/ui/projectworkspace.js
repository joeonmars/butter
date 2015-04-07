goog.provide('btr.controllers.ui.ProjectWorkspace');

goog.require('btr.controllers.basics.UI');


/**
 * The project workspace UI.
 * @constructor
 */
btr.controllers.ui.ProjectWorkspace = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

	this._navigationPane = null;
	this._editorPane = null;
	this._boardPane = null;
};
goog.inherits(btr.controllers.ui.ProjectWorkspace, btr.controllers.basics.UI);


btr.controllers.ui.ProjectWorkspace.prototype.initialize = function() {

	goog.base(this, 'initialize');

	this._navigationPane = this.getChild('navigation-pane');
	this._editorPane = this.getChild('editor-pane');
	this._boardPane = this.getChild('board-pane');
};


btr.controllers.ui.ProjectWorkspace.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();

	handler.listen( this._navigationPane, goog.events.EventType.CHANGE, this.resize, false, this );
	handler.listen( this._editorPane, goog.events.EventType.CHANGE, this.resize, false, this );
	handler.listen( window, goog.events.EventType.RESIZE, this.resize, false, this );

	this._navigationPane.activate();
	this._editorPane.activate();
	this._boardPane.activate();

	this.resize();
};


btr.controllers.ui.ProjectWorkspace.prototype.resize = function() {

	var navigationPaneWidth = this._navigationPane.getWidth();
	var editorPaneWidth = this._editorPane.getWidth();

	var totalWidth = goog.style.getSize(this.getElement()).width;
	var boardPaneWidth = totalWidth - navigationPaneWidth - editorPaneWidth;

	var boardPaneEl = this._boardPane.getElement();
	goog.style.setStyle(boardPaneEl, 'width', boardPaneWidth+'px');
};