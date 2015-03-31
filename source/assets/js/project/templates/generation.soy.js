// This file was automatically generated from generation.soy.
// Please don't edit this file by hand.

goog.provide('btr.templates.Generation');

goog.require('soy');
goog.require('soydata');
goog.require('btr.templates.Main');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Generation.MainPage = function(opt_data, opt_ignored) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>title</title><link rel="stylesheet" href="assets/styles/css/main.css"></head><body>' + btr.templates.Generation.MainContent(opt_data) + '<!-- run js --><script src="assets/js/main.js"><\/script><script>main();<\/script></body></html>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Generation.MainContent = function(opt_data, opt_ignored) {
  var output = '<!-- page content --><div>';
  var boardList9 = soy.$$getMapKeys(opt_data.boards);
  var boardListLen9 = boardList9.length;
  for (var boardIndex9 = 0; boardIndex9 < boardListLen9; boardIndex9++) {
    var boardData9 = boardList9[boardIndex9];
    output += btr.templates.Main.Board(null);
  }
  output += '</div>';
  return output;
};
