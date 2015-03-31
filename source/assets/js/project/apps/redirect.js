goog.provide('btr.apps.Redirect');

goog.require('goog.dom');
goog.require('goog.Uri');


btr.apps.Redirect = function() {

	var uri = goog.Uri.parse( window.location );
	//var query = uri.getQueryData();

	window['accessToken'] = uri.hasFragment() ? uri.getFragment().split('=')[1] : null;

	var dom = goog.dom.createDom('div', null, 'access token: ' + window['accessToken']);
	goog.dom.appendChild(document.body, dom);
};