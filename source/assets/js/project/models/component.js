goog.provide('btr.models.Component');

goog.require('goog.Disposable');
goog.require('goog.object');
goog.require('goog.json.Serializer');


/**
 * Basic component data structure.
 * @constructor
 * @param {string} name The name of the model
 */
btr.models.Component = function( name ) {

	goog.base(this);

	this.name = name;

	this._data = {};
	this._defaultData = null;

	var data = btr.appLoader.getAsset(this.name);
	this.applyData( data ? data[this.name] : {} );
};
goog.inherits(btr.models.Component, goog.Disposable);


btr.models.Component.prototype.set = function(key, value) {

	this._data[key] = value;
};


btr.models.Component.prototype.get = function(key) {

	return this._data[key];
};


btr.models.Component.prototype.getData = function() {

	return this._data;
};


btr.models.Component.prototype.getDefaultData = function() {

	return this._defaultData;
};


btr.models.Component.prototype.extend = function(object) {

	goog.object.extend(this._data, object);
};


btr.models.Component.prototype.deserialize = function(opt_str) {

	return goog.json.parse( opt_str || this.serialize() );
};


btr.models.Component.prototype.serialize = function() {

	return btr.models.Component.Serializer.serialize(this._data);
};


btr.models.Component.prototype.applyData = function(data) {

	this._defaultData = data;

	goog.object.forEach(this._defaultData, function(obj, name) {

		var _value;

		if(goog.isArray(obj) || goog.isBoolean(obj) || goog.isString(obj)) {
			_value = obj;
		}else {
			_value = obj['value'];
		}

		this.set(name, _value);

	}, this);

	console.log('"' + this.name + '" data loaded.', this.serialize());
};


btr.models.Component.Serializer = new goog.json.Serializer();