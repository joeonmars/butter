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
  return '<section class="board"><div class="layer components"></div><div class="layer grid"></div><div class="layer selection"></div></section>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.EditorWindow = function(opt_data, opt_ignored) {
  var output = '<div class="editor-window"><div class="title-bar"><h6>' + opt_data.data['title'] + '</h6><div class="controls"><button class="icon icon-expand" data-id="toggle"></button><button class="icon icon-close" data-id="close"></button></div></div><ul class="property-sheet">';
  var keyList10 = soy.$$getMapKeys(opt_data.data);
  var keyListLen10 = keyList10.length;
  for (var keyIndex10 = 0; keyIndex10 < keyListLen10; keyIndex10++) {
    var keyData10 = keyList10[keyIndex10];
    var editor__soy11 = opt_data.data[keyData10]['editor'];
    output += (editor__soy11) ? '<li><label>' + opt_data.data[keyData10]['title'] + '</label><div class="field" data-id="' + keyData10 + '" data-type="' + editor__soy11 + '"></div></li>' : '';
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
  var value__soy24 = opt_data.data['value'];
  var min__soy25 = opt_data.data['min'];
  var max__soy26 = opt_data.data['max'];
  var type__soy27 = (opt_data.data['editor'] == 'integer') ? 'number' : (opt_data.data['editor'] == 'integerrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy27 + '" step="1" value="' + value__soy24 + '" ' + ((min__soy25 != null) ? 'min="' + min__soy25 + '"' : '') + ' ' + ((max__soy26 != null) ? 'max="' + max__soy26 + '"' : '') + ' data-id="' + opt_data.name + '">';
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
  var value__soy53 = opt_data.data['value'];
  var min__soy54 = opt_data.data['min'];
  var max__soy55 = opt_data.data['max'];
  var type__soy56 = (opt_data.data['editor'] == 'number') ? 'number' : (opt_data.data['editor'] == 'numberrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy56 + '" step="0.01" value="' + value__soy53 + '" ' + ((min__soy54 != null) ? 'min="' + min__soy54 + '"' : '') + ' ' + ((max__soy55 != null) ? 'max="' + max__soy55 + '"' : '') + ' data-id="' + opt_data.name + '">';
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
  var value__soy82 = opt_data.data['value'];
  output += '<input class="field" type="color" value="' + value__soy82 + '" data-id="' + opt_data.name + '">';
  return output;
};
