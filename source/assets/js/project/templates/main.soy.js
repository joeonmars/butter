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
  return '<main><div id="toolbar"></div><div id="project-container" class="ui" data-model="project-container" data-control="project-container"><div id="project-initializer" class="ui" data-model="project-initializer"></div><div id="project-workspace" class="ui" data-model="project-workspace" data-control="project-workspace"><div id="navigation-pane" class="ui" data-model="navigation-pane" data-control="navigation-pane"><button class="unfold button"></button><div class="content-container"></div></div><div id="board-pane" class="ui" data-model="board-pane" data-control="board-pane"><div id="board-container"></div><div id="editor-window-container"></div></div><div id="editor-pane" class="ui" data-model="editor-pane" data-control="editor-pane"><button class="unfold button"></button><div class="content-container"></div></div></div></div></main>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.NewDocumentDialog = function(opt_data, opt_ignored) {
  return '<div id="new-document-dialog"><label>Create a new butter document</label><fieldset>width: <input type="number" step="1" value="">height: <input type="number" step="1" value=""></fieldset><fieldset><button class="confirm"></button><button class="cancel"></button></fieldset></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.ImagesPanel = function(opt_data, opt_ignored) {
  var output = '<ul class="images-panel" style="position:absolute;">';
  var imageList107 = opt_data.images;
  var imageListLen107 = imageList107.length;
  for (var imageIndex107 = 0; imageIndex107 < imageListLen107; imageIndex107++) {
    var imageData107 = imageList107[imageIndex107];
    var caption__soy108 = imageData107['caption'];
    output += '<img src="' + imageData107['thumbnail'] + '" ' + ((caption__soy108) ? 'title="' + caption__soy108 + '"' : '') + ' draggable="false">';
  }
  output += '</ul>';
  return output;
};
