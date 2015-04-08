goog.provide('btr.apps.ButterApp');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.controllers.globals.AppLoader');
goog.require('btr.controllers.globals.ResourceManager');
goog.require('btr.controllers.globals.ShortcutManager');
goog.require('btr.controllers.globals.NativeUIManager');
goog.require('btr.controllers.globals.BoardManager');
goog.require('btr.controllers.globals.ProjectManager');
goog.require('btr.controllers.basics.Constructors');
goog.require('btr.controllers.elements.BoardGroup');
goog.require('btr.controllers.ui.ProjectContainer');
goog.require('btr.templates.Main');
goog.require('btr.templates.Component');
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

		btr.commonUtils = btr.utils.Common;

		btr.projectManager = btr.controllers.globals.ProjectManager.getInstance();

		btr.shortcuts = btr.controllers.globals.ShortcutManager.getInstance();

		btr.resources = btr.controllers.globals.ResourceManager.getInstance();

		btr.imageExport = btr.services.ImageExport.getInstance();
		btr.htmlExport = btr.services.HtmlExport.getInstance();
		
		btr.webServices = btr.services.webservices.WebServiceServer.getInstance();
		//btr.webServices.facebook.login();

		btr.boardManager = btr.controllers.globals.BoardManager.getInstance();

		btr.nativeUI = btr.controllers.globals.NativeUIManager.getInstance();

		// test
		var projectContainerEl = goog.dom.getElement('project-container');
		var projectContainer = new btr.controllers.ui.ProjectContainer('project-container', projectContainerEl);
		projectContainer.enterDocument();

		//btr.imageExport.exportFrom();
		//btr.htmlExport.exportFrom();
	});

	btr.appLoader.load();
};