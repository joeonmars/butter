goog.provide('btr.controllers.componentgroups.BoardGroup');

goog.require('btr.controllers.basics.ComponentGroup');


/**
 * Board Group, included components:
 * Board, Grid
 * @constructor
 */
btr.controllers.componentgroups.BoardGroup = function() {

	goog.base(this, 'boardgroup', ['board', 'grid']);

};
goog.inherits(btr.controllers.componentgroups.BoardGroup, btr.controllers.basics.ComponentGroup);


btr.controllers.componentgroups.BoardGroup.prototype.createComponent = function(constructor, model) {

	var component;

	switch(model.name) {
		case 'grid':
		var board = this.getComponent('board');
		var element = board.view.query('.grid')[0];
		component = new constructor(model, null, null, element);
		break;

		default:
		component = goog.base(this, 'createComponent', constructor, model);
		break;
	}

	return component;
};


btr.controllers.componentgroups.BoardGroup.prototype.setIndex = function(index) {

	var board = this.getComponent('board');
	board.model.set('index', index);
};