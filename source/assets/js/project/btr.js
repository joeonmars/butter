goog.provide('btr');

goog.require('btr.apps.ButterApp');
goog.require('btr.apps.Generation');
goog.require('btr.apps.Redirect');


btr.Config = {};


btr.init = function( config ) {

	btr.Config = config;
	
	var uri = goog.Uri.parse( window.location );
	if(uri.hasFragment()) {
		btr.Config['app'] = 'redirect';
	}

	switch(btr.Config['app']) {
		case 'butterapp':
		btr.apps.ButterApp();
		break;

		case 'generation':
		btr.apps.Generation();
		break;

		case 'redirect':
		btr.apps.Redirect();
		break;
	};
};

goog.exportProperty(window, 'btr', btr);
goog.exportProperty(btr, 'init', btr.init);