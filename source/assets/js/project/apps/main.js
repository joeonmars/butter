goog.provide('btr.apps.Main');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.templates.Main');


btr.apps.Main = function() {

	goog.fx.anim.setAnimationWindow(window);

	var helloWorld = soy.renderAsFragment(btr.templates.Main.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	//console.log(TweenMax);
};