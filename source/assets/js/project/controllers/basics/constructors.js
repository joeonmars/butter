goog.provide('btr.controllers.basics.Constructors');

goog.require('btr.templates.Component');
goog.require('btr.controllers.elements.Board');
goog.require('btr.controllers.elements.BoardGroup');
goog.require('btr.controllers.elements.Grid');
goog.require('btr.controllers.elements.EditorWindow');


btr.controllers.basics.Constructors = {

	controls: {
		'board': btr.controllers.elements.Board,
		'board-group': btr.controllers.elements.BoardGroup,
		'grid': btr.controllers.elements.Grid,
		'editor-window': btr.controllers.elements.EditorWindow
	},

	templates: {
		'board-group': btr.templates.Component.Board,
		'editor-window': btr.templates.Component.EditorWindow
	}
};