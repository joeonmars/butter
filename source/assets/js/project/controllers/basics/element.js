goog.provide('btr.controllers.basics.Element');

goog.require('goog.dom');
goog.require('btr.controllers.basics.Control');
goog.require('btr.controllers.elements.EditorWindow');


/**
 * The actual element contained by board.
 * @constructor
 */
btr.controllers.basics.Element = function( model, view, opt_rootElement ) {

	this.isShortcutEnabled = true;

	goog.base( this, model, view, opt_rootElement );
};
goog.inherits(btr.controllers.basics.Element, btr.controllers.basics.Control);


btr.controllers.basics.Element.prototype.createChildComponent = function(element) {

	var model = element.getAttribute('data-model');

	if(model === 'editor-window') {

		var model = this.model.clone('editor-window');
		var view = goog.dom.getElementByClass( 'editor-window', this.getElement() );
		var component = btr.controllers.basics.Control.createComponent(model, view, 'editor-window');
		this.addChild(component, false);
		component.render( goog.dom.getElement('editor-window-container') );

	}else {

		goog.base(this, 'createChildComponent', element);
	}
};


btr.controllers.basics.Element.prototype.handleContextMenu = function(e) {

	goog.base( this, 'handleContextMenu', e );

	var editorWindow = this.getChild('editor-window');

	if(editorWindow) {
		
		var relPosition = goog.style.getClientPosition( editorWindow.getElement().parentNode );

		var mouseX = e.clientX - relPosition.x;
		var mouseY = e.clientY - relPosition.y;

		editorWindow.setVisible( true );
		editorWindow.setPosition( mouseX, mouseY );
	}
};


btr.controllers.basics.Element.prototype.handleShortcut = function(id) {

	goog.base(this, 'handleShortcut', id);

	if(id === 'edit-in-place') {

		var editorWindow = this.getChild('editor-window');

		if(editorWindow) {
			editorWindow.toggleVisible();
		}
	}
};


btr.controllers.basics.Element.prototype.onDataChange = function(changes) {

	goog.base( this, 'onDataChange', changes );
};