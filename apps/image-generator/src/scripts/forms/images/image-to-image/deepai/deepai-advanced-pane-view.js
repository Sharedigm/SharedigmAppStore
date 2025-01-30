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

import AdvancedPaneView from '../../../../../../../views/apps/image-generator/forms/images/image-to-image/panes/advanced-pane-view.js';

export default AdvancedPaneView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="seed form-group">
			<label class="control-label"><i class="fa fa-seedling"></i>Seed</label>
			<div class="controls">
				<input class="seed" type="number" value="<%= seed %>" />
				<i class="active fa fa-question-circle" data-toggle="popover" title="Seed" data-content="This is the random seed to use which determines the randomized aspects of the image. If not specified, then a random seed will be used."></i>
			</div>
		</div>
	`),

	//
	// getting methods
	//

	getValue: function(key) {
		switch (key) {
			case 'seed':
				return this.$el.find('.seed input').val();
		}
	},

	getValues: function() {
		return {
			seed: this.getValue('seed')
		};
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			seed: undefined
		}
	}
});