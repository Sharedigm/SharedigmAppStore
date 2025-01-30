/******************************************************************************\
|                                                                              |
|                           parameters-panel-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing a type of sidebar panel.         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImageGenerator from '../../../../../models/ai/image-generator.js';
import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import ParametersView from '../../../../../views/apps/image-generator/sidebar/lists/parameters-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'parameters panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-table"></i>Parameters</label>
		</div>
		
		<div class="info">
			<div class="items">
				<div class="tile-grid">
					<div class="empty">No parameters.</span>
				</div>
			</div>
		</div>
	`),

	regions: {
		'info': '.info'
	},	

	//
	// constructor
	//

	initialize: function() {

		// listen to model for changes
		//
		this.listenTo(this.model, 'change', () => {
			this.update();
		});
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showParameters();
	},

	showParameters: function() {
		if (!this.model) {
			return;
		}

		// get metadata
		//
		let exif = this.model.get('exif');

		// show child views
		//
		this.showChildView('info', new ParametersView({
			parameters: ImageGenerator.getMetadata(exif)
		}));
	},

	update: function() {

		// update parameters list
		//
		this.showParameters();
	}
});