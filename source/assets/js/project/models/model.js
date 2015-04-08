goog.provide('btr.models.Model');

goog.require('goog.Disposable');
goog.require('goog.format.JsonPrettyPrinter');
goog.require('goog.object');
goog.require('goog.json.Serializer');


/**
 * Basic model.
 * @constructor
 * @param {string} name The name of the model.
 * @param {object} opt_data The optional data copy to apply to the model.
 */
btr.models.Model = function( name, opt_data, opt_defaultData ) {

	goog.base(this);

	this._defaultData = opt_defaultData || {};

	if(btr.appLoader) {
		this._defaultData = btr.appLoader.getAsset(name) ?
			btr.appLoader.getAsset(name)['data'] : this._defaultData;
	}

	this._data = opt_data || goog.object.clone( this._defaultData );

	this.name = name;
	this.id = this.setId();

	console.log('"' + this.name + '" data applied.', this.serialize());
};
goog.inherits(btr.models.Model, goog.Disposable);


btr.models.Model.prototype.set = function(key, value) {

	this._data[key] = value;

	return this._data[key];
};


btr.models.Model.prototype.setId = function( opt_defaultId, opt_force ) {

	var defaultId = opt_defaultId || (this.name + '-' + goog.now());

	if(!this.get('id') || opt_force) {
		this.set('id', defaultId);
	}

	this.id = this.get('id');

	return this.id;
};


btr.models.Model.prototype.setValue = function(key, value) {

	this._data[key].value = value;
};


btr.models.Model.prototype.get = function(key) {

	return this._data[key];
};


btr.models.Model.prototype.getValue = function(key) {

	return this._data[key].value;
};


btr.models.Model.prototype.getData = function() {

	return this._data;
};


btr.models.Model.prototype.getDefaultData = function() {

	return this._defaultData;
};


btr.models.Model.prototype.deserialize = function(opt_str) {

	return goog.json.parse( opt_str || this.serialize() );
};


btr.models.Model.prototype.serialize = function(pretty) {

	var str = btr.models.Model.Serializer.serialize(this._data);

	return pretty ? btr.models.Model.Printer.format(str) : str;
};


btr.models.Model.prototype.clone = function(name) {

	return new btr.models.Model( name, this._data, this._defaultData );
};


btr.models.Model.Serializer = new goog.json.Serializer();
btr.models.Model.Printer = new goog.format.JsonPrettyPrinter();