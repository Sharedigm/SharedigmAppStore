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

	template: template(`
		<div class="resolution form-group">
			<label class="control-label"><i class="fa fa-arrows"></i>Resolution</label>
			<div class="controls">
				<input class="width" type="number" value="<%= width %>" min="1" max="2048" step="1" style="width:4em" /> x
				<input class="height" type="number" value="<%= height %>" min="1" max="2048" step="1" style="width:4em" /> pixels
				<i class="active fa fa-question-circle" data-toggle="popover" title="Resolution" data-content="This is the size of the generated image in pixels."></i>
			</div>
		</div>
	`),

	//
	// constructor
	//

	initialize: function() {

		// set options from metadata or defaults
		//
		if (this.options.metadata) {
			this.setOptions(this.options.metadata);
		}
	},

	//
	// setting methods
	//

	setOptions: function(options) {
		let keys = Object.keys(this.defaults);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			this.options[key] = options && options[key]? options[key] : this.defaults[key];
		}
	},

	setValue: function(key, value) {
		switch (key) {
			case 'width':
				this.$el.find('.width').val(value);
				break;
			case 'height':
				this.$el.find('.height').val(value);
				break;
		}
	},

	setValues: function(values) {
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
		this.setValues(_.extend({}, this.defaults, this.options.metadata, {
			seed: undefined
		}));
	}
});