goog.provide('btr.controllers.globals.WindowManager');

goog.require('goog.events');

/**
 * The global window controller.
 * @constructor
 */
btr.controllers.globals.WindowManager = function() {

	var GUI = require('nw.gui');

	GUI.Window.get().on('close', function(){
	   GUI.App.quit();
	});
};
goog.addSingletonGetter(btr.controllers.globals.WindowManager);