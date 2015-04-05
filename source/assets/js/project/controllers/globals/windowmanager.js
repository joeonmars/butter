goog.provide('btr.controllers.globals.WindowManager');

goog.require('goog.events');
goog.require('btr.controllers.globals.ShortcutManager');

/**
 * The global window controller.
 * @constructor
 */
btr.controllers.globals.WindowManager = function() {

	var GUI = require('nw.gui');

	var guiWindow = GUI.Window.get();

	var initWidth = Math.max(1024, Math.min(1600, screen.width * .8));
	var initHeight = Math.max(768, Math.min(1000, screen.height * .8));
	var initX = (screen.width - initWidth)/2;
	var initY = (screen.height - initHeight)/2;
	guiWindow.resizeTo(initWidth, initHeight);
	guiWindow.moveTo(initX, initY);

	guiWindow.show();
	
	guiWindow.on('close', function(){
	   GUI.App.quit();
	});

	var shortcuts = btr.controllers.globals.ShortcutManager.getInstance();
	shortcuts.register('show-devtools', function(){
		if(!guiWindow.isDevToolsOpen()) {
			guiWindow.showDevTools();
		}
	});

	//USE THIS TO DETECT FILE INPUT
	//https://github.com/nwjs/nw.js/wiki/Handling-files-and-arguments
	/*
	GUI.App.on('open', function(cmdline) {
	  console.log('command line: ' + cmdline);
	});

	console.log(GUI.App.argv);
	*/

	//
	if(process.platform === "darwin") {

		var menubar = new GUI.Menu({type: 'menubar'});
		menubar.createMacBuiltin('RoboPaint', {
			'hideEdit': false
		});

		guiWindow['menu'] = menubar;

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