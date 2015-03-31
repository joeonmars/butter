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
  var keyList15 = soy.$$getMapKeys(opt_data.data);
  var keyListLen15 = keyList15.length;
  for (var keyIndex15 = 0; keyIndex15 < keyListLen15; keyIndex15++) {
    var keyData15 = keyList15[keyIndex15];
    var editor__soy16 = opt_data.data[keyData15]['editor'];
    output += (editor__soy16) ? '<li><label>' + opt_data.data[keyData15]['title'] + '</label><div class="field" data-id="' + keyData15 + '" data-type="' + editor__soy16 + '"></div></li>' : '';
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
  var value__soy29 = opt_data.data['value'];
  var min__soy30 = opt_data.data['min'];
  var max__soy31 = opt_data.data['max'];
  var type__soy32 = (opt_data.data['editor'] == 'integer') ? 'number' : (opt_data.data['editor'] == 'integerrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy32 + '" step="1" value="' + value__soy29 + '" ' + ((min__soy30 != null) ? 'min="' + min__soy30 + '"' : '') + ' ' + ((max__soy31 != null) ? 'max="' + max__soy31 + '"' : '') + ' data-id="' + opt_data.name + '">';
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
  var value__soy58 = opt_data.data['value'];
  var min__soy59 = opt_data.data['min'];
  var max__soy60 = opt_data.data['max'];
  var type__soy61 = (opt_data.data['editor'] == 'number') ? 'number' : (opt_data.data['editor'] == 'numberrange') ? 'range' : '';
  output += '<input class="field" type="' + type__soy61 + '" step="0.01" value="' + value__soy58 + '" ' + ((min__soy59 != null) ? 'min="' + min__soy59 + '"' : '') + ' ' + ((max__soy60 != null) ? 'max="' + max__soy60 + '"' : '') + ' data-id="' + opt_data.name + '">';
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
  var value__soy87 = opt_data.data['value'];
  output += '<input class="field" type="color" value="' + value__soy87 + '" data-id="' + opt_data.name + '">';
  return output;
};
