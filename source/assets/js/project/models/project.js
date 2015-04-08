goog.provide('btr.models.Project');


/**
 * The model represention of a new/existing project.
 * @constructor
 */
btr.models.Project = function(opt_data) {

	goog.base(this, 'project', opt_data);
	
};
goog.inherits(btr.models.Project, btr.models.Model);