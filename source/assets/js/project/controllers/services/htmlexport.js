goog.provide('btr.controllers.services.HtmlExport');

goog.require('goog.events.EventTarget');
goog.require('btr.templates.Generation');


/**
 * HTML Export service controller, export boards as HTML for internal or external use.
 * @constructor
 */
btr.controllers.services.HtmlExport = function() {

	goog.base(this);

};
goog.inherits(btr.controllers.services.HtmlExport, goog.events.EventTarget);
goog.addSingletonGetter(btr.controllers.services.HtmlExport);


btr.controllers.services.HtmlExport.prototype.exportFrom = function(dest) {

	if(!btr.isNative) return;

	var html = btr.templates.Generation.MainPage({name: 'Ed'});

	var fs = require('fs-extra');

	var path = './cache/pages/index.html';
	var content = html;

	fs.writeFile(path, content, function(err) {
	  if(err) {
	  	throw err;
	  }
	  console.log("index.html was saved!");

	  var templateDir = './assets/page_template';
	  var destDir = './cache/pages';

	  fs.copy(templateDir, destDir, function (err) {
		  if (err) {
		    throw err;
		  } else {
		    console.log("template was successfully copied!");
		  }
		});
	});
};