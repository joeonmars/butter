goog.provide('btr');

goog.require('btr.apps.Main');


btr.Config = {};


btr.init = function( config ) {

	btr.Config = config;
	
	switch(btr.Config['app']) {
		case 'main':
		btr.apps.Main();
		break;
	};
};

goog.exportProperty(window, 'btr', btr);
goog.exportProperty(btr, 'init', btr.init);