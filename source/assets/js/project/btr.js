goog.provide('btr');

goog.require('btr.apps.ButterApp');
goog.require('btr.apps.Generation');


btr.Config = {};


btr.init = function( config ) {

	btr.Config = config;
	
	switch(btr.Config['app']) {
		case 'butterapp':
		btr.apps.ButterApp();
		break;

		case 'generation':
		btr.apps.Generation();
		break;
	};
};

goog.exportProperty(window, 'btr', btr);
goog.exportProperty(btr, 'init', btr.init);