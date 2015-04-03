goog.provide('btr.apps.ButterApp');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.controllers.globals.AppLoader');
goog.require('btr.controllers.globals.ShortcutManager');
goog.require('btr.controllers.globals.WindowManager');
goog.require('btr.controllers.globals.BoardManager');
goog.require('btr.controllers.componentgroups.BoardGroup');
goog.require('btr.models.Config');
goog.require('btr.templates.Main');
goog.require('btr.services.ImageExport');
goog.require('btr.services.HtmlExport');
goog.require('btr.services.webservices.WebServiceServer');
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

		btr.window = btr.controllers.globals.WindowManager.getInstance();

		btr.imageExport = btr.services.ImageExport.getInstance();
		btr.htmlExport = btr.services.HtmlExport.getInstance();
		
		btr.webServices = btr.services.webservices.WebServiceServer.getInstance();
		btr.webServices.facebook.login();

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