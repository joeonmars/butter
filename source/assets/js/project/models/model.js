goog.provide('btr.models.Model');

goog.require('goog.Disposable');
goog.require('goog.object');
goog.require('goog.json.Serializer');


/**
 * Basic model.
 * @constructor
 * @param {string} name The name of the model.
 * @param {object} opt_data The optional data copy to apply to the model.
 */
btr.models.Model = function( name, opt_data ) {

	goog.base(this);

	this._data = {};
	this._defaultData = null;

	this.name = name;
	this.id = this.name + '-' + goog.getUid(this);

	var data = opt_data || (btr.appLoader ? 
		(btr.appLoader.getAsset(this.name) ? btr.appLoader.getAsset(this.name)['data'] : null) : null);

	this.applyData( data || {} );
};
goog.inherits(btr.models.Model, goog.Disposable);


btr.models.Model.prototype.set = function(key, value) {

	this._data[key] = value;

	return value;
};


btr.models.Model.prototype.get = function(key) {

	return this._data[key];
};


btr.models.Model.prototype.getData = function() {

	return this._data;
};


btr.models.Model.prototype.getDefaultData = function() {

	return this._defaultData;
};


btr.models.Model.prototype.extend = function(object) {

	goog.object.extend(this._data, object);
};


btr.models.Model.prototype.deserialize = function(opt_str) {

	return goog.json.parse( opt_str || this.serialize() );
};


btr.models.Model.prototype.serialize = function() {

	return btr.models.Model.Serializer.serialize(this._data);
};


btr.models.Model.prototype.clone = function(name) {

	return new btr.models.Model(name, this._data);
};


btr.models.Model.prototype.applyData = function(data) {

	this._defaultData = data;

	goog.object.forEach(this._defaultData, function(obj, name) {

		var _value;

		if(goog.isArray(obj) || goog.isBoolean(obj) || goog.isString(obj) || goog.isNumber(obj)) {
			_value = obj;
		}else {
			_value = obj['value'];
		}

		this.set(name, _value);

	}, this);

	console.log('"' + this.name + '" data applied.', this.serialize());
};


btr.models.Model.Serializer = new goog.json.Serializer();