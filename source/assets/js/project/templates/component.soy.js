// This file was automatically generated from component.soy.
// Please don't edit this file by hand.

goog.provide('btr.templates.Component');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Component.Board = function(opt_data, opt_ignored) {
  return '<section class="component board-view" data-model="board" data-control="board-group"><div class="board"><div class="layer elements"></div><div class="layer component grid" data-model="grid" data-control="grid"></div><div class="layer selection"></div>' + btr.templates.Component.EditorWindow(opt_data) + '</div></section>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Component.EditorWindow = function(opt_data, opt_ignored) {
  var output = '<div class="component editor-window" data-model="editor-window" data-control="editor-window"><div class="title-bar"><h6>' + opt_data.data['title'] + '</h6><div class="controls"><button class="icon icon-expand" data-id="toggle"></button><button class="icon icon-close" data-id="close"></button></div></div><ul class="property-sheet">';
  var keyList11 = soy.$$getMapKeys(opt_data.data);
  var keyListLen11 = keyList11.length;
  for (var keyIndex11 = 0; keyIndex11 < keyListLen11; keyIndex11++) {
    var keyData11 = keyList11[keyIndex11];
    var editor__soy12 = opt_data.data[keyData11]['editor'];
    output += (editor__soy12) ? '<li><label>' + opt_data.data[keyData11]['title'] + '</label><div class="field" data-id="' + keyData11 + '" data-type="' + editor__soy12 + '"></div></li>' : '';
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
btr.templates.Component.IntegerField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy25 = opt_data.data['value'];
  var min__soy26 = opt_data.data['min'];
  var max__soy27 = opt_data.data['max'];
  var type__soy28 = (opt_data.data['editor'] == 'integer') ? 'number' : (opt_data.data['editor'] == 'integerrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy28 + '" step="1" value="' + value__soy25 + '" ' + ((min__soy26 != null) ? 'min="' + min__soy26 + '"' : '') + ' ' + ((max__soy27 != null) ? 'max="' + max__soy27 + '"' : '') + ' data-id="' + opt_data.name + '">';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Component.NumberField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy54 = opt_data.data['value'];
  var min__soy55 = opt_data.data['min'];
  var max__soy56 = opt_data.data['max'];
  var type__soy57 = (opt_data.data['editor'] == 'number') ? 'number' : (opt_data.data['editor'] == 'numberrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy57 + '" step="0.01" value="' + value__soy54 + '" ' + ((min__soy55 != null) ? 'min="' + min__soy55 + '"' : '') + ' ' + ((max__soy56 != null) ? 'max="' + max__soy56 + '"' : '') + ' data-id="' + opt_data.name + '">';
  return output;
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Component.ColorField = function(opt_data, opt_ignored) {
  var output = '';
  var value__soy83 = opt_data.data['value'];
  output += '<input class="field" type="color" value="' + value__soy83 + '" data-id="' + opt_data.name + '">';
  return output;
};
