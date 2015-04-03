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

	//
	if(process.platform === "darwin") {

		var menubar = new GUI.Menu({type: 'menubar'});
		menubar.createMacBuiltin('RoboPaint', {
			'hideEdit': false
		});

		GUI.Window.get()['menu'] = menubar;

		var menu = new GUI.Menu();

		var cut = new GUI.MenuItem({
			label: "Cut"
			, click: function() {
			  document.execCommand("cut");
			}
		});

		var copy = new GUI.MenuItem({
			label: "Copy"
			, click: function() {
			  document.execCommand("copy");
			}
		});

		var paste = new GUI.MenuItem({
			label: "Paste"
			, click: function() {
			  document.execCommand("paste");
			}
		});

		menu.append(cut);
		menu.append(copy);
		menu.append(paste);

		goog.events.listen(document, goog.events.EventType.CONTEXTMENU, function(e) {

			e.preventDefault();

			if((e.target.tagName === 'TEXTAREA')
				|| (e.target.tagName === 'INPUT' && (e.target.type === 'number' || e.target.type === 'text'))) {

				menu.popup(e.clientX, e.clientY);
			}
		});
	}
};
goog.addSingletonGetter(btr.controllers.globals.WindowManager);