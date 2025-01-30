/******************************************************************************\
|                                                                              |
|                            advanced-pane-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing advanced parameters.                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import FormView from '../../../../../../../views/forms/form-view.js';

export default FormView.extend({

	// defaults
	//
	defaults: {
		width: 1024,
		height: 1024,
		seed: undefined
	},

	//
	// constructor
	//

	initialize: function() {

		// set options from metadata or defaults
		//
		let metadata = this.options.metadata;
		let keys = Object.keys(this.defaults);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			this.options[key] = metadata && metadata[key]? metadata[key] : this.defaults[key];
		}
	},

	//
	// setting methods
	//

	setValues: function(values) {

		// check if we can set values
		//
		if (!this.setValue) {
			return;
		}

		// set parameter values
		//
		let keys = Object.keys(values);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = values[key];
			this.setValue(key, value);
		}
		this.setValue('resolution', [values['width'], values['height']]);
	},

	reset: function() {
		this.setValues(this.defaults);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call ssuperclass method
		//
		FormView.prototype.onRender.call(this);

		// set initial values
		//
		this.setValues(_.extend({}, this.defaults, this.options.metadata));
	}
});