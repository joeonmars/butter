goog.provide('btr.controllers.globals.BoardManager');

goog.require('goog.events');
goog.require('btr.controllers.basics.Controller');

/**
 * The global board controller.
 * @constructor
 */
btr.controllers.globals.BoardManager = function() {

	goog.base(this, 'boardmanager');

	this._boardsData = this.model.set('boards', {});
	this._boardGroups = [];
};
goog.inherits(btr.controllers.globals.BoardManager, btr.controllers.basics.Controller);
goog.addSingletonGetter(btr.controllers.globals.BoardManager);


btr.controllers.globals.BoardManager.prototype.addBoard = function(boardGroup, opt_index) {

	var index = goog.isNumber(opt_index) ? opt_index : (this._boardGroups.length - 1);
	goog.array.insertAt(this._boardGroups, boardGroup, index);

	this.updateIndexes();

	this._boardsData[boardGroup.model.id] = boardGroup.model.getData();
};


btr.controllers.globals.BoardManager.prototype.removeBoard = function(boardGroup) {

	goog.array.remove(this._boardGroups, boardGroup);

	boardGroup.dispose();

	this.updateIndexes();

	delete this._boardsData[boardGroup.model.id];
};


btr.controllers.globals.BoardManager.prototype.getBoardById = function(id) {

	var board = goog.array.find(this._boardGroups, function(board) {
		return (board.id === id);
	});

	return board;
};


btr.controllers.globals.BoardManager.prototype.updateIndexes = function() {

	goog.array.forEach(this._boardGroups, function(boardGroup, index) {
		boardGroup.setIndex(index);
	});
};