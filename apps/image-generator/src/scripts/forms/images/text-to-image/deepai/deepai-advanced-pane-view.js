/******************************************************************************\
|                                                                              |
|                         deepai-advanced-pane-view.js                         |
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

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/text-to-image/panes/advanced-pane-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="grid-size form-group">
			<label class="control-label"><i class="fa fa-th-large"></i>Grid Size</label>
			<div class="controls">
				<select>
					<option value="1"<% if (grid_size == 1) { %> selected<% } %>>1</option>
					<option value="2"<% if (grid_size == 2) { %> selected<% } %>>2</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Grid Size" data-content="Number of images to generate (1 or 4). "></i>
			</div>
		</div>

		<div class="image-generator-version form-group">
			<label class="control-label"><i class="fa fa-robot"></i>Generator Version</label>
			<div class="controls">
				<select>
					<option value="hd"<% if (image_generator_version == 'hd') { %> selected<% } %>>HD</option>
					<option value="standard"<% if (image_generator_version == 'standard') { %> selected<% } %>>Standard</option>
				</select>
				<i class="active fa fa-question-circle" data-toggle="popover" title="Generator Version" data-content="Which image generator to use. "></i>
			</div>
		</div>
	`),

	defaults: {
		grid_size: 1,
		image_generator_version: 'hd'
	},

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'grid_size':
				return parseInt(this.$el.find('.grid_size select').val());
			case 'image_generator_version':
				return this.$el.find('.image-generator-version select').val();
		}
	},

	getValues: function() {
		return {
			grid_size: this.getValue('grid_size'),
			image_generator_version: this.getValue('image_generator_version')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return this.defaults;
	}
});