goog.provide('btr.controllers.globals.ProjectManager');

goog.require('goog.events.EventHandler');
goog.require('goog.events.EventTarget');
goog.require('btr.events');
goog.require('btr.models.Project');


/**
 * The global project controller. Takes change of creating/opening/saving/exiting any project,
 * And the current project's life cycle.
 * @constructor
 */
btr.controllers.globals.ProjectManager = function() {

	goog.base(this);
	
	this._openInput = goog.dom.createDom('input', {
		'type': 'file',
		'accept': '.butter',
		'nwworkingdir': '/home/path/'
	});
	goog.events.listen(this._openInput, goog.events.EventType.CHANGE, this.onOpen, false, this);
	
	this._saveInput = goog.dom.createDom('input', {
		'type': 'file',
		'accept': '.butter',
		'nwworkingdir': '/home/path/',
		'nwsaveas': 'Untitled.butter'
	});
	goog.events.listen(this._saveInput, goog.events.EventType.CHANGE, this.onSave, false, this);

	this._currentProject = null;
	this._eventHandler = new goog.events.EventHandler(this);

	var fs = require('fs-extra');
	var cachePath = btr.config['cachePath'] + 'workspace/';
	fs.ensureDir( cachePath );
};
goog.inherits(btr.controllers.globals.ProjectManager, goog.events.EventTarget);
goog.addSingletonGetter(btr.controllers.globals.ProjectManager);


btr.controllers.globals.ProjectManager.prototype.getCurrentProject = function() {

	return this._currentProject;
};


btr.controllers.globals.ProjectManager.prototype.create = function() {

	this._currentProject = new btr.models.Project();

	this.dispatchEvent({
		type: btr.events.EventType.CREATE,
		project: this._currentProject,
		ready: goog.bind(this.onCreateReady, this),
		cancel: goog.bind(this.onCreateCancel, this)
	});
};


btr.controllers.globals.ProjectManager.prototype.open = function() {

	this._openInput.click();
};


btr.controllers.globals.ProjectManager.prototype.save = function() {

	var defaultFileName = this._currentProject.get('title').replace(' ', '_') + '.butter';
	this._saveInput.setAttribute('nwsaveas', defaultFileName);

	this._saveInput.click();
};


btr.controllers.globals.ProjectManager.prototype.close = function() {

	
};


btr.controllers.globals.ProjectManager.prototype.clearCache = function() {

	console.log("CLEAR CACHE!");

	var fs = require('fs-extra');

	var cachePath = btr.config['cachePath'] + 'workspace/';

	fs.remove(cachePath, goog.bind(function (err) {
	  if (err) {
	  	this.onClearCacheFail();
	  }else {
	  	this.onClearCacheSuccess();
	  }
	}, this));
};


btr.controllers.globals.ProjectManager.prototype.onClearCacheSuccess = function() {

	
};


btr.controllers.globals.ProjectManager.prototype.onClearCacheFail = function() {

	throw new Error("Encountered an error while clearing workspace cache.");
};


btr.controllers.globals.ProjectManager.prototype.onCreateReady = function() {

	var fs = require('fs-extra');
	var templatePath = btr.config['assetsPath'] + 'project_template';
	var cachePath = btr.config['cachePath'] + 'workspace/' + this._currentProject.id + '/';

	this._currentProject.set('cachePath', cachePath);

	fs.copy(templatePath, cachePath, goog.bind(function(err) {

	  if (err) {

	  	return console.error(err);

	  }else {

		this.dispatchEvent({
			type: btr.events.EventType.CREATE_COMPLETE,
			project: this._currentProject
		});

		var jsonString = this._currentProject.serialize( true );
		var cacheJsonPath = this._currentProject.get('cachePath') + 'project.json';

		fs.writeFile(cacheJsonPath, jsonString, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
	  }
	}, this));
};


btr.controllers.globals.ProjectManager.prototype.onCreateCancel = function() {


};


btr.controllers.globals.ProjectManager.prototype.onOpen = function(e) {

	var AdmZip = require('adm-zip');

	// reading archives 
	var filePath = e.target.value;
	var zip = new AdmZip( filePath );
	var zipEntries = zip.getEntries();

	// extracts everything
	var cachePath = btr.config['cachePath'] + 'workspace/';
	zip.extractAllTo(cachePath, true);

	// apply to project
	var projectJson;

	zipEntries.forEach(function(zipEntry) {
		if(zipEntry.name === 'project.json') {
			projectJson = JSON.parse( zip.readAsText( zipEntry.entryName ) );
		}
	});

	this._currentProject = new btr.models.Project( projectJson );

	this.dispatchEvent({
		type: btr.events.EventType.CREATE_COMPLETE,
		project: this._currentProject
	});
};


btr.controllers.globals.ProjectManager.prototype.onSave = function(e) {

	var AdmZip = require('adm-zip');

	// creating archives 
	var zip = new AdmZip();

	// add local file
	var cachePath = this._currentProject.get('cachePath');
	var targetPath = './' + this._currentProject.id;
	zip.addLocalFolder( cachePath, targetPath );

	// STORE
	var zipEntries = zip.getEntries();

	zipEntries.forEach(function(zipEntry) {
		zipEntry.header.method = 0;
	});

	// get everything as a buffer 
	var willSendthis = zip.toBuffer();

	// or write everything to disk
	var filePath = e.target.value;
	zip.writeZip( filePath );
};