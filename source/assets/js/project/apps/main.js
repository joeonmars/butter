goog.provide('btr.apps.Main');

goog.require('goog.dom');
goog.require('goog.fx.anim');
goog.require('btr.models.Config');
goog.require('btr.templates.Main');
goog.require('btr.models.Component');


btr.apps.Main = function() {

	goog.fx.anim.setAnimationWindow(window);

	var helloWorld = soy.renderAsFragment(btr.templates.Main.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	btr.config = btr.models.Config.getInstance();

	// test
	var model = new btr.models.Component('board');

	var controller = new btr.config.constructors.controllers[model.name](model);
	controller.add();
};


btr.gui = window.require ? require('nw.gui') : null;


// init node-webkit app settings
if(btr.gui) {

	var gui = btr.gui;

	if(process.platform === "darwin") {

		var menubar = new gui.Menu({type: 'menubar'});
		menubar.createMacBuiltin('RoboPaint', {
			'hideEdit': false
		});

		gui.Window.get()['menu'] = menubar;

		var menu = new gui.Menu();

		var cut = new gui.MenuItem({
			label: "Cut"
			, click: function() {
			  document.execCommand("cut");
			}
		});

		var copy = new gui.MenuItem({
			label: "Copy"
			, click: function() {
			  document.execCommand("copy");
			}
		});

		var paste = new gui.MenuItem({
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