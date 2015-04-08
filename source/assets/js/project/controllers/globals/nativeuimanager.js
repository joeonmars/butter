goog.provide('btr.controllers.globals.NativeUIManager');

goog.require('goog.events');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');
goog.require('btr.controllers.globals.ShortcutManager');

/**
 * The global window controller.
 * @constructor
 */
btr.controllers.globals.NativeUIManager = function() {

	var GUI = require('nw.gui');

	var guiWindow = GUI.Window.get();

	var initWidth = Math.max(1024, Math.min(1600, screen.width * .8));
	var initHeight = Math.max(768, Math.min(1000, screen.height * .8));
	var initX = (screen.width - initWidth)/2;
	var initY = (screen.height - initHeight)/2;
	guiWindow.resizeTo(initWidth, initHeight);
	guiWindow.moveTo(initX, initY);

	guiWindow.show();
	
	// handle window close
	var clearCache = new goog.async.Deferred( null, btr.projectManager );
	clearCache.addCallback( btr.projectManager.clearCache );

	var list = [clearCache];

	var deferredList = goog.async.DeferredList.gatherResults( list, false, true );

	deferredList.addCallback(function() {
		GUI.App.quit();
		guiWindow.close(true);
	});

	guiWindow.on('close', function(){
	   goog.array.forEach(list, function(deferred) {
			deferred.callback();
		});
	   return false;
	});

	//
	var shortcuts = btr.controllers.globals.ShortcutManager.getInstance();
	shortcuts.register('show-devtools', function(){
		if(!guiWindow.isDevToolsOpen()) {
			guiWindow.showDevTools();
		}
	});

	//
	var menuBar = new GUI.Menu({ type: "menubar" });
	menuBar.createMacBuiltin( document.title, {
		'hideEdit': false
	});

	var item = new GUI.MenuItem({ label: 'File' });

	var submenu = new GUI.Menu();

	var newItem = new GUI.MenuItem({
		label: 'New',
		click: function() {
			btr.projectManager.create();
		}
	});

	var openItem = new GUI.MenuItem({
		label: 'Open',
		click: function() {
			btr.projectManager.open();
		}
	});

	var saveItem = new GUI.MenuItem({
		label: 'Save',
		click: function() {
			btr.projectManager.save();
		}
	});

	var saveAsItem = new GUI.MenuItem({
		label: 'Save As',
		click: function() {
		}
	});

	var closeItem = new GUI.MenuItem({
		label: 'Close',
		click: function() {
		}
	});

	var importResourceItem = new GUI.MenuItem({
		label: 'Import Resource',
		click: function() {
			btr.resources.openImportDialog();
		}
	});

	submenu.append( newItem );
	submenu.append( openItem );
	submenu.append( saveItem );
	submenu.append( saveAsItem );
	submenu.append( closeItem );
	submenu.append( importResourceItem );
	
	item.submenu = submenu;

	menuBar.insert(item, 1);

	guiWindow.menu = menuBar;

	//USE THIS TO DETECT FILE INPUT
	//https://github.com/nwjs/nw.js/wiki/Handling-files-and-arguments
	/*
	GUI.App.on('open', function(cmdline) {
	  console.log('command line: ' + cmdline);
	});

	console.log(GUI.App.argv);
	*/

	var contextMenu = new GUI.Menu();

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

	contextMenu.append(cut);
	contextMenu.append(copy);
	contextMenu.append(paste);

	goog.events.listen(document, goog.events.EventType.CONTEXTMENU, function(e) {

		e.preventDefault();

		if((e.target.tagName === 'TEXTAREA')
			|| (e.target.tagName === 'INPUT' && (e.target.type === 'number' || e.target.type === 'text'))) {

			contextMenu.popup(e.clientX, e.clientY);
		}
	});
};
goog.addSingletonGetter(btr.controllers.globals.NativeUIManager);