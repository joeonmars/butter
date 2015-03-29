goog.provide('btr.models.Config');

goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');
goog.require('btr.controllers.components.board.Board');
goog.require('btr.templates.Main');
goog.require('btr.views.components.board.Board');

/**
 * Configurations.
 */
btr.models.Config = function() {

	this.constructors = {
		controllers: {
			'board': btr.controllers.components.board.Board
		},
		views: {
			'board': btr.views.components.board.Board
		},
		templates: {
			'board': btr.templates.Main.Board
		}
	};

	this.dataURL = {
		'board': btr.Config.assetsPath + '/json/components/board.json'
	};

	this.shortcuts = {
		'zoom-in': [goog.events.KeyCodes.EQUALS, goog.ui.KeyboardShortcutHandler.Modifiers.META],
		'zoom-out': [goog.events.KeyCodes.DASH, goog.ui.KeyboardShortcutHandler.Modifiers.META]
	};

};
goog.addSingletonGetter(btr.models.Config);