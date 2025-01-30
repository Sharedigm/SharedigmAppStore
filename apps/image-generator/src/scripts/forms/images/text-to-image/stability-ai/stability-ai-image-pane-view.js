/******************************************************************************\
|                                                                              |
|                        stability-ai-image-pane-view.js                       |
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

	resolutions: [
		[1024, 1024, '1:1'],
		[1152, 896, '9:7'],
		[1216, 832, '19:13'],
		[1344, 768, '7:4'],
		[1536, 640, '12:5'],
		[640, 1536, '5:12'],
		[768, 1344, '4:7'],
		[832, 1216, '13:19'],
		[896, 1152, '7:9']
	],

	defaults: {
		width: 1024,
		height: 1024
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			selected_index: this.selected_index,
			resolutions: this.resolutions,
			max_size: 1280
		};
	}
});