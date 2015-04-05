// This file was automatically generated from test.soy.
// Please don't edit this file by hand.

goog.provide('btr.templates.Test');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Test.HelloWorld = function(opt_data, opt_ignored) {
  return '<div class="component main" data-model="test-main">This is a component.<div class="component" data-model="test-child-1">This is the child component 1.<div class="component" data-model="test-child-2" data-view="test-child-2"><div class="component" data-model="test-child-3" data-view="test-child-3" data-control="test-child-3"></div></div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Test.TestChildComponent2 = function(opt_data, opt_ignored) {
  return '<div class="component">This is a child component 2.</div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Test.TestChildComponent3 = function(opt_data, opt_ignored) {
  return '<div class="component" data-model="test-child-3" data-view="test-child-3" data-control="test-child-3">This is a child component 3.</div>';
};
