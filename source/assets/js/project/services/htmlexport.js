goog.provide('btr.services.HtmlExport');

goog.require('goog.events.EventTarget');
goog.require('btr.templates.Generation');


/**
 * HTML Export service controller, export boards as HTML for internal or external use.
 * @constructor
 */
btr.services.HtmlExport = function() {

	goog.base(this);

};
goog.inherits(btr.services.HtmlExport, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.HtmlExport);


btr.services.HtmlExport.prototype.exportFrom = function(dest) {

	if(!btr.isNative) return;

	var html = btr.templates.Generation.MainPage({
		name: 'Ed',
		boards: btr.boardManager.model.getData()['boards']
	});

	var beautifyHtml = require('js-beautify').html;
	html = beautifyHtml(html, {
		'indent_size': 2
	});

	var fs = require('fs-extra');

  var templateDir = './assets/page_template';
  var destDir = './cache/pages';

  fs.copy(templateDir, destDir, function (err) {

	  if (err) {

	    throw err;

	  } else {

	    console.log("Template was successfully copied!");

			var path = './cache/pages/index.html';

			fs.writeFile(path, html, function(err) {
			  if(err) {
			  	throw err;
			  }
			  console.log("index.html was saved!");
			});
	  }
	});
};