goog.provide('btr.controllers.basics.Constructors');

goog.require('btr.templates.Component');
goog.require('btr.controllers.basics.Control');
goog.require('btr.controllers.basics.UI');
goog.require('btr.controllers.elements.Board');
goog.require('btr.controllers.elements.BoardGroup');
goog.require('btr.controllers.elements.Grid');
goog.require('btr.controllers.elements.EditorWindow');
goog.require('btr.controllers.ui.EditorPane');
goog.require('btr.controllers.ui.NavigationPane');
goog.require('btr.controllers.ui.BoardPane');
goog.require('btr.controllers.ui.ProjectContainer');
goog.require('btr.controllers.ui.ProjectWorkspace');


btr.controllers.basics.Constructors = {

	controllers: {
		'board': btr.controllers.elements.Board,
		'board-group': btr.controllers.elements.BoardGroup,
		'grid': btr.controllers.elements.Grid,
		'editor-window': btr.controllers.elements.EditorWindow,
		'project-container': btr.controllers.ui.ProjectContainer,
		'project-workspace': btr.controllers.ui.ProjectWorkspace,
		'navigation-pane': btr.controllers.ui.NavigationPane,
		'board-pane': btr.controllers.ui.BoardPane,
		'editor-pane': btr.controllers.ui.EditorPane
	},

	templates: {
		'board-group': btr.templates.Component.Board,
		'editor-window': btr.templates.Component.EditorWindow
	}
};