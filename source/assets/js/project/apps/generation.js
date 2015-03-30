goog.provide('btr.apps.Generation');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.templates.Generation');


btr.apps.Generation = function() {

	goog.fx.anim.setAnimationWindow(window);

	var helloWorld = soy.renderAsFragment(btr.templates.Generation.MainContent);
	goog.dom.appendChild(document.body, helloWorld);
};


goog.exportProperty(window, 'main', btr.apps.Generation);