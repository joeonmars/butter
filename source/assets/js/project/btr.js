goog.provide('btr');

goog.require('btr.apps.ButterApp');
goog.require('btr.apps.Generation');
goog.require('btr.apps.Test');


btr.config = {};


btr.init = function( config ) {

	btr.config = config;

	switch(btr.config['app']) {
		case 'butterapp':
		btr.apps.ButterApp();
		break;

		case 'generation':
		btr.apps.Generation();
		break;

		case 'test':
		btr.apps.Test();
		break;
	};
};

goog.exportProperty(window, 'btr', btr);
goog.exportProperty(btr, 'init', btr.init);