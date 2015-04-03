goog.provide('btr.services.ImageExport');

goog.require('goog.events.EventTarget');


/**
 * Image Export service controller, export boards as images for internal or external use.
 * @constructor
 */
btr.services.ImageExport = function() {

	goog.base(this);

};
goog.inherits(btr.services.ImageExport, goog.events.EventTarget);
goog.addSingletonGetter(btr.services.ImageExport);


btr.services.ImageExport.prototype.exportFrom = function(dest) {

	var Pageres = require('pageres');

	var pageres = new Pageres({delay: 2})
	  .src('./assets/styles/scss/icons.html', ['1280x1024', '1920x1080'], {scale: 2})
	  .src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], {crop: true})
	  .src('todomvc.com', ['1280x1024', '1920x1080'])
	  .dest('./cache/shots');

	pageres.run(function (err) {
	  if (err) {
	      throw err;
	  }

	  console.log('done');
	});
};