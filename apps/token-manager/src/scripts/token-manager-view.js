/******************************************************************************\
|                                                                              |
|                            token-manager-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an app for viewing and editing tokens.                   |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ImageGenerators from '../../../collections/ai/image-generators.js';
import AppSplitView from '../../../views/apps/common/app-split-view.js';
import HeaderBarView from '../../../views/apps/token-manager/header-bar/header-bar-view.js';
import SideBarView from '../../../views/apps/token-manager/sidebar/sidebar-view.js';
import MainBarView from '../../../views/apps/token-manager/mainbar/mainbar-view.js';
import FooterBarView from '../../../views/apps/token-manager/footer-bar/footer-bar-view.js';

export default AppSplitView.extend({

	//
	// attributes
	//

	name: 'token_manager',

	//
	// constructor
	//

	initialize: function() {

		// call superclass constructor
		//
		AppSplitView.prototype.initialize.call(this);

		// set attributes
		//
		this.collection = new ImageGenerators();

		// set static attributes
		//
		this.constructor.current = this;
	},

	//
	// querying methods
	//

	hasSelected: function() {
		if (this.hasChildView('sidebar')) {
			return this.getChildView('sidebar').hasSelected();
		}
	},

	//
	// getting methods
	//

	getStatusBarView: function() {
		return FooterBarView.prototype.getStatusBarView();
	},

	getSelectedChildView: function(which) {
		if (this.hasChildView('sidebar')) {
			return this.getChildView('sidebar').getSelectedChildView(which);
		}
	},

	//
	// rendering methods
	//

	onRender: function() {
		this.collection.fetch({

			// callbacks
			//
			success: (collection) => {

				// show first generator in list
				//
				this.model = collection.at(0);

				// call superclass method
				//
				AppSplitView.prototype.onRender.call(this);

				// update
				//
				this.onLoad();
			}
		});
	},

	//
	// header bar rendering methods
	//

	getHeaderBarView: function() {
		return new HeaderBarView();
	},

	//
	// contents rendering methods
	//

	getSideBarView: function() {
		return new SideBarView({
			collection: this.collection,

			// options
			//
			panels: this.preferences.get('sidebar_panels'),
			view_kind: this.preferences.get('sidebar_view_kind'),
			selected: [this.model],

			// callbacks
			//
			onselect: (item) => this.onSelect(item)
		});
	},

	getContentView: function() {
		return new MainBarView({
			model: this.model
		});
	},

	//
	// footer bar rendering methods
	//

	getFooterBarView: function() {
		return new FooterBarView();
	},

	//
	// selection event handling methods
	//

	onSelect: function(item) {
		this.model = item.model;
		this.showContent();
	},

	//
	// cleanup methods
	//

	onBeforeDestroy: function() {

		// clear static attributes
		//
		this.constructor.current = null;
	}
});