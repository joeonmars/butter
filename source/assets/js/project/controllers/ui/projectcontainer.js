goog.provide('btr.controllers.ui.ProjectContainer');

goog.require('btr.controllers.basics.UI');


/**
 * The project container UI.
 * @constructor
 */
btr.controllers.ui.ProjectContainer = function( model, view, opt_rootElement ) {

	goog.base( this, model, view, opt_rootElement );

};
goog.inherits(btr.controllers.ui.ProjectContainer, btr.controllers.basics.UI);


btr.controllers.ui.ProjectContainer.prototype.enterDocument = function() {

	goog.base(this, 'enterDocument');

	this.resize();
};


btr.controllers.ui.ProjectContainer.prototype.activateInternal = function() {

	goog.base(this, 'activateInternal');

	var handler = this.getHandler();

	var navigationPane = this.getChild('navigation-pane');
	handler.listen( navigationPane, goog.events.EventType.CHANGE, this.resize, false, this );

	var editorPane = this.getChild('editor-pane');
	handler.listen( editorPane, goog.events.EventType.CHANGE, this.resize, false, this );

	handler.listen( window, goog.events.EventType.RESIZE, this.resize, false, this );
};


btr.controllers.ui.ProjectContainer.prototype.resize = function() {

	var navigationPane = this.getChild('navigation-pane');
	var editorPane = this.getChild('editor-pane');

	var navigationPaneWidth = navigationPane.getWidth();
	var editorPaneWidth = editorPane.getWidth();

	var totalWidth = goog.style.getSize(this.getElement()).width;
	var boardPaneWidth = totalWidth - navigationPaneWidth - editorPaneWidth;

	var boardPaneEl = this.getChild('board-pane').getElement();
	goog.style.setStyle(boardPaneEl, 'width', boardPaneWidth+'px');
};