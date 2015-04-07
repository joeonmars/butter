goog.provide('btr.controllers.globals.ResourceManager');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('btr.controllers.basics.Controller');

/**
 * The global resource controller.
 * Handles local/web image/video resources registration and storage.
 * @constructor
 */
btr.controllers.globals.ResourceManager = function() {

	goog.base(this, 'resource');

	this.model.set('resources', []);

	// create hidden inputs
	this._workspaceResourcePath = './cache/workspace/resources/';
	this._imagePath = 'images/';

	this._imageInput = goog.dom.createDom('input', {
		'type': 'file',
		'multiple': true,
		'accept': '.jpg,.jpeg,.png,.gif,.bmp',
		'nwworkingdir': '/home/path/',
		'data-type': btr.controllers.globals.ResourceManager.Type.IMAGE
	});

	goog.events.listen(this._imageInput, goog.events.EventType.CHANGE, this.onInputChange, false, this);
};
goog.inherits(btr.controllers.globals.ResourceManager, btr.controllers.basics.Controller);
goog.addSingletonGetter(btr.controllers.globals.ResourceManager);


btr.controllers.globals.ResourceManager.prototype.openImportDialog = function() {

	this._imageInput.click();
};


btr.controllers.globals.ResourceManager.prototype.register = function(resource) {

	var resources = this.model.get('resources');
	resources.push( resource );

	console.log(resources);

	// test
	var img = new Image();
	img.src = resource.get('local');
	document.body.appendChild(img);
	goog.style.setStyle(img, {
		'position': 'absolute',
		'top': Math.random()*window.innerHeight + 'px',
		'left': Math.random()*window.innerWidth + 'px',
		'z-index': 1000
	});
};


btr.controllers.globals.ResourceManager.prototype.unregister = function(resource) {

};


btr.controllers.globals.ResourceManager.prototype.getAllResources = function() {

};


btr.controllers.globals.ResourceManager.prototype.getResourcesByType = function(type) {

};


btr.controllers.globals.ResourceManager.prototype.getResourceById = function(id) {

};


btr.controllers.globals.ResourceManager.prototype.createResourceId = function(resource) {

};


btr.controllers.globals.ResourceManager.prototype.handleCopiedFile = function(fileName, fileType, filePath) {

	console.log('Copied file: ' + fileName + ' to "' + filePath + '"');

	// create and register resource from copy
	var title = fileName.replace(/\.[^/.]+$/, "");
	var resource = new btr.models.Model(fileType);
	resource.set('title', title);
	resource.set('local', filePath);

	this.register( resource );
};


btr.controllers.globals.ResourceManager.prototype.onInputChange = function(e) {

	var value = e.target.value;
	var files = e.target['files'];
	var fileType = e.target.getAttribute('data-type');

	var fs = require('fs-extra');
	var handleCopiedFile = goog.bind(this.handleCopiedFile, this);

	goog.array.forEach(files, function(file) {

		var filePath = file['path'];
		var fileName = file['name'];
		var targetPath = this._workspaceResourcePath + this._imagePath + fileName;

		fs.copy(filePath, targetPath, function(error) {

			if (error) {

				return console.error(error);

			}else {

				handleCopiedFile(fileName, fileType, targetPath);
			}
		});
	}, this);

	/* should save this to local storage
	var pathSuggestion = value.split(';')[0];
	pathSuggestion = pathSuggestion.replace(/[^\/]*$/, '');

	console.log(pathSuggestion);
	*/

	// reset input value to enable a change event on the same folder
	e.target.value = '';
};


btr.controllers.globals.ResourceManager.Type = {
	IMAGE: 'image',
	VIDEO: 'video'
};