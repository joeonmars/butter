goog.provide('btr.apps.ButterApp');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.controllers.globals.AppLoader');
goog.require('btr.controllers.globals.ShortcutManager');
goog.require('btr.models.Config');
goog.require('btr.templates.Main');
goog.require('btr.controllers.componentgroups.BoardGroup');
goog.require('btr.controllers.services.ImageExport');
goog.require('btr.controllers.services.HtmlExport');


btr.apps.ButterApp = function() {

	goog.fx.anim.setAnimationWindow(window);

	var helloWorld = soy.renderAsFragment(btr.templates.Main.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	btr.appLoader = new btr.controllers.globals.AppLoader(function(json) {

		console.log("APP LOADED.", json);

		btr.config = btr.models.Config.getInstance();

		btr.shortcuts = btr.controllers.globals.ShortcutManager.getInstance();

		btr.imageExport = btr.controllers.services.ImageExport.getInstance();
		btr.imageExport.exportFrom();

		btr.htmlExport = btr.controllers.services.HtmlExport.getInstance();
		btr.htmlExport.exportFrom();

		// test
		var boardGroup = new btr.controllers.componentgroups.BoardGroup;
		boardGroup.add();
	});

	btr.appLoader.load();
};

btr.isNative = goog.isDef(window.require);

// init node-webkit app settings
if(btr.isNative) {

	var _gui = require('nw.gui');

	if(process.platform === "darwin") {

		var menubar = new _gui.Menu({type: 'menubar'});
		menubar.createMacBuiltin('RoboPaint', {
			'hideEdit': false
		});

		_gui.Window.get()['menu'] = menubar;

		var menu = new _gui.Menu();

		var cut = new _gui.MenuItem({
			label: "Cut"
			, click: function() {
			  document.execCommand("cut");
			}
		});

		var copy = new _gui.MenuItem({
			label: "Copy"
			, click: function() {
			  document.execCommand("copy");
			}
		});

		var paste = new _gui.MenuItem({
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
}