goog.provide('btr.utils.Common');

goog.require('goog.dom');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.window');


btr.utils.Common.escapeConsole = function() {

  window.console = {};
  
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ];
  
  for(var i=0;i<methods.length;i++){
    console[methods[i]] = function(){};
  }
};


btr.utils.Common.getQuery = function(key) {

  var uri = new goog.Uri( window.location.href );
  var queryData = uri.getQueryData();

  return queryData.get(key);
};


btr.utils.Common.hasQuery = function(key, value) {

  var uri = new goog.Uri( window.location.href );
  var queryData = uri.getQueryData();

  return (goog.isString(value) ? (queryData.get(key) === value) : queryData.hasQuery(key));
};


btr.utils.Common.openWindow = function(url) {

  var width = 1024;
  var height = 640;

  var _gui = require('nw.gui');

  var _window = _gui.Window.open(url, {
    'width': width,
    'height': height
  });

  _window.setPosition( 'mouse' );
  //_window.setAlwaysOnTop( true );

  return _window;
};