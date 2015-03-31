// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('btr.templates.Main');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.HelloWorld = function(opt_data, opt_ignored) {
  return '<main><div id="board-container"></div><div id="window-editor-container"></div></main>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.Board = function(opt_data, opt_ignored) {
  return '<section class="board-view"><div class="board"><div class="layer components"></div><div class="layer grid"></div><div class="layer selection"></div></div></section>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.EditorWindow = function(opt_data, opt_ignored) {
  var output = '<div class="editor-window"><div class="title-bar"><h6>' + opt_data.data['title'] + '</h6><div class="controls"><button class="icon icon-expand" data-id="toggle"></button><button class="icon icon-close" data-id="close"></button></div></div><ul class="property-sheet">';
  var keyList22 = soy.$$getMapKeys(opt_data.data);
  var keyListLen22 = keyList22.length;
  for (var keyIndex22 = 0; keyIndex22 < keyListLen22; keyIndex22++) {
    var keyData22 = keyList22[keyIndex22];
    var editor__soy23 = opt_data.data[keyData22]['editor'];
    output += (editor__soy23) ? '<li><label>' + opt_data.data[keyData22]['title'] + '</label><div class="field" data-id="' + keyData22 + '" data-type="' + editor__soy23 + '"></div></li>' : '';
  }
  output += '</ul></div>';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.IntegerField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy36 = opt_data.data['value'];
  var min__soy37 = opt_data.data['min'];
  var max__soy38 = opt_data.data['max'];
  var type__soy39 = (opt_data.data['editor'] == 'integer') ? 'number' : (opt_data.data['editor'] == 'integerrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy39 + '" step="1" value="' + value__soy36 + '" ' + ((min__soy37 != null) ? 'min="' + min__soy37 + '"' : '') + ' ' + ((max__soy38 != null) ? 'max="' + max__soy38 + '"' : '') + ' data-id="' + opt_data.name + '">';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.NumberField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy65 = opt_data.data['value'];
  var min__soy66 = opt_data.data['min'];
  var max__soy67 = opt_data.data['max'];
  var type__soy68 = (opt_data.data['editor'] == 'number') ? 'number' : (opt_data.data['editor'] == 'numberrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy68 + '" step="0.01" value="' + value__soy65 + '" ' + ((min__soy66 != null) ? 'min="' + min__soy66 + '"' : '') + ' ' + ((max__soy67 != null) ? 'max="' + max__soy67 + '"' : '') + ' data-id="' + opt_data.name + '">';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.ColorField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy94 = opt_data.data['value'];
  output += '<input class="field" type="color" value="' + value__soy94 + '" data-id="' + opt_data.name + '">';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.InstagramLogin = function(opt_data, opt_ignored) {
  return '<button class="login instagram" style="position:absolute">Login Instagram</button>';
};
