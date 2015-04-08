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
  return '<main><div id="toolbar"></div><div id="project-container" class="ui" data-model="project-container" data-control="project-container"><div id="project-creator" class="ui" data-model="project-creator" data-control="project-creator"></div><div id="project-workspace" class="ui" data-model="project-workspace" data-control="project-workspace"><div id="navigation-pane" class="ui" data-model="navigation-pane" data-control="navigation-pane"><button class="unfold button"></button><div class="content-container"></div></div><div id="board-pane" class="ui" data-model="board-pane" data-control="board-pane"><div id="board-container"></div><div id="editor-window-container"></div></div><div id="editor-pane" class="ui" data-model="editor-pane" data-control="editor-pane"><button class="unfold button"></button><div class="content-container"></div></div></div></div></main>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.ProjectCreator = function(opt_data, opt_ignored) {
  return '<div class="dialog"><label>Create a new document</label><fieldset>title: <input type="text" name="title" value="' + opt_data.data['title'] + '">width: <input type="number" name="width" step="1" value="' + opt_data.data['width']['value'] + '" min="' + opt_data.data['width']['min'] + '" max="' + opt_data.data['width']['max'] + '">height: <input type="number" name="height" step="1" value="' + opt_data.data['height']['value'] + '" min="' + opt_data.data['height']['min'] + '" max="' + opt_data.data['height']['max'] + '"></fieldset><fieldset><button class="ok">OK</button><button class="cancel">Cancel</button></fieldset></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
btr.templates.Main.ImagesPanel = function(opt_data, opt_ignored) {
  var output = '<ul class="images-panel" style="position:absolute;">';
  var imageList121 = opt_data.images;
  var imageListLen121 = imageList121.length;
  for (var imageIndex121 = 0; imageIndex121 < imageListLen121; imageIndex121++) {
    var imageData121 = imageList121[imageIndex121];
    var caption__soy122 = imageData121['caption'];
    output += '<img src="' + imageData121['thumbnail'] + '" ' + ((caption__soy122) ? 'title="' + caption__soy122 + '"' : '') + ' draggable="false">';
  }
  output += '</ul>';
  return output;
};
