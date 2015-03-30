goog.provide('btr.models.Config');

goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('btr.controllers.components.board.Board');
goog.require('btr.controllers.components.Grid');
goog.require('btr.templates.Main');
goog.require('btr.views.components.board.Board');

/**
 * Configurations.
 */
btr.models.Config = function() {

	this.constructors = {
		controllers: {
			'board': btr.controllers.components.board.Board,
			'grid': btr.controllers.components.Grid
		},
		views: {
			'board': btr.views.components.board.Board
		},
		templates: {
			'board': btr.templates.Main.Board
		}
	};
};
goog.addSingletonGetter(btr.models.Config);