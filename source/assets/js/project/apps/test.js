goog.provide('btr.apps.Test');

goog.require('goog.dom');
goog.require('goog.dom.query');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');
goog.require('btr.templates.Test');


btr.apps.Test = function() {

	var helloWorld = soy.renderAsFragment(btr.templates.Test.HelloWorld);
	goog.dom.appendChild(document.body, helloWorld);

	var da = new goog.async.Deferred();
	da.addCallback(function(e) {
		console.log('a:',e);
		throw new Error("!!!!");
	}, this);

	var db = new goog.async.Deferred();
	db.addCallback(function(e) {
		console.log('b:',e);
	}, this);

	var deferredList = goog.async.DeferredList.gatherResults([da, db], false, true);
	deferredList.addCallback(function(res) {
		console.log('finish!', res);
	});
	deferredList.addErrback(function(res) {
		console.log('error!', res);
	});

	da.callback(true);
	db.callback(true);
};