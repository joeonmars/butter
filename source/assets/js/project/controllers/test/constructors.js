goog.provide('btr.controllers.test.Constructors');

goog.require('btr.templates.Test');


btr.controllers.test.Constructors = {

	controls: {
		'test-child-3': btr.controllers.test.Control
	},

	templates: {
		'test-child-2': btr.templates.Test.TestChildComponent2,
		'test-child-3': btr.templates.Test.TestChildComponent3
	}
};