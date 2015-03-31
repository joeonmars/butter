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

  if(!btr.isNative) {
    return null;
  }

  var width, height;

  var isFacebook = goog.string.contains( url, 'facebook' );
  var isTwitter = goog.string.contains( url, 'twitter' );
  var isGoogle = goog.string.contains( url, 'google' );

  if(isFacebook) {

    width = 640;
    height = 275;

  }else if(isTwitter) {

    width = 575;
    height = 275;

  }else if(isGoogle) {

    width = 640;
    height = 470;

  }else {

    width = 640;
    height = 470;
  }

  var viewportSize = goog.dom.getViewportSize();

  var x = (window.screenLeft || window.screenX) + (viewportSize.width - width)/2;
  var y = (window.screenTop || window.screenY) + (viewportSize.height - height)/2;

  var _gui = require('nw.gui');

  var _window = _gui.Window.open(url, {
    'x': x,
    'y': y,
    'width': width,
    'height': height
  });

  return _window;
};