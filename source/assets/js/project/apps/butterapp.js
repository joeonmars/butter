goog.provide('btr.apps.ButterApp');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.controllers.globals.AppLoader');
goog.require('btr.controllers.globals.ShortcutManager');
goog.require('btr.controllers.globals.BoardManager');
goog.require('btr.controllers.componentgroups.BoardGroup');
goog.require('btr.models.Config');
goog.require('btr.templates.Main');
goog.require('btr.services.ImageExport');
goog.require('btr.services.HtmlExport');
goog.require('btr.services.Instagram');
goog.require('btr.services.Dribbble');
goog.require('btr.services.Facebook');
goog.require('btr.services.Flickr');
goog.require('btr.utils.Common');


btr.apps.ButterApp = function() {

	goog.fx.anim.setAnimationWindow(window);

	var helloWorld = soy.renderAsFragment(btr.templates.Main.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	btr.appLoader = new btr.controllers.globals.AppLoader(function(json) {

		console.log("APP LOADED.", json);

		btr.config = btr.models.Config.getInstance();
		btr.commonUtils = btr.utils.Common;

		btr.shortcuts = btr.controllers.globals.ShortcutManager.getInstance();

		btr.imageExport = btr.services.ImageExport.getInstance();
		btr.htmlExport = btr.services.HtmlExport.getInstance();
		//btr.instagram = btr.services.Instagram.getInstance();
		//btr.dribbble = btr.services.Dribbble.getInstance();
		//btr.facebook = btr.services.Facebook.getInstance(); //no iframe allowed
		//btr.flickr = btr.services.Flickr.getInstance(); //no iframe allowed

		btr.boardManager = btr.controllers.globals.BoardManager.getInstance();

		// test
		for(var i = 0; i < 1; i++) {
			var boardGroup = new btr.controllers.componentgroups.BoardGroup;
			boardGroup.add();

			btr.boardManager.addBoard( boardGroup );
		}

		//btr.imageExport.exportFrom();
		btr.htmlExport.exportFrom();
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