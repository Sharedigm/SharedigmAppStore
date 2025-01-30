/******************************************************************************\
|                                                                              |
|                     stable-diffusion-api-image-pane-view.js                  |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view for showing image parameters.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImagePaneView from '../../../../../../../views/apps/image-generator/forms/images/text-to-image/panes/image-pane-view.js';

export default ImagePaneView.extend({

	//
	// attributes
	//

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
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'width':
				return parseInt(this.$el.find('.width').val());
			case 'height':
				return parseInt(this.$el.find('.height').val());
		}
	},

	getValues: function() {
		return {
			width: this.getValue('width'),
			height: this.getValue('height')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			width: 1024,
			height: 1024
		}
	}
});