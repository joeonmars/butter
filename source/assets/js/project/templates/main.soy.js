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
  return '<main><div id="toolbar"></div><div id="project-container"><div id="navigation-pane"></div><div id="board-pane"><div id="board-container"></div><div id="editor-window-container"></div></div><div id="editor-pane"></div></div></main>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.ImagesPanel = function(opt_data, opt_ignored) {
  var output = '<ul class="images-panel" style="position:absolute;">';
  var imageList105 = opt_data.images;
  var imageListLen105 = imageList105.length;
  for (var imageIndex105 = 0; imageIndex105 < imageListLen105; imageIndex105++) {
    var imageData105 = imageList105[imageIndex105];
    var caption__soy106 = imageData105['caption'];
    output += '<img src="' + imageData105['thumbnail'] + '" ' + ((caption__soy106) ? 'title="' + caption__soy106 + '"' : '') + ' draggable="false">';
  }
  output += '</ul>';
  return output;
};
