goog.provide('btr.apps.Test');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('btr.templates.Test');
goog.require('btr.controllers.test.Control');


btr.apps.Test = function() {

	var helloWorld = soy.renderAsFragment(btr.templates.Test.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	var element = goog.dom.query('.main')[0];
	var control = btr.controllers.test.Control.createComponentFromElement( element );
	control.render( document.body );

	//control.dispose();
};