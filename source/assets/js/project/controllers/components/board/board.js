goog.provide('btr.controllers.components.board.Board');

goog.require('btr.controllers.basics.Component');


/**
 * Basic board component controller.
 * @constructor
 * @param {btr.models.Component} model The data model
 */
btr.controllers.components.board.Board = function( model ) {

	goog.base(this, model);

	this.isShortcutEnabled = true;
	this.isEditable = true;
};
goog.inherits(btr.controllers.components.board.Board, btr.controllers.basics.Component);