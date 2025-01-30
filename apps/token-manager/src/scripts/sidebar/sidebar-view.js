/******************************************************************************\
|                                                                              |
|                               sidebar-view.js                                |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view used for showing an app's sidebar.                |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import SideBarView from '../../../../views/apps/common/sidebar/sidebar-view.js';
import TokensPanelView from '../../../../views/apps/token-manager/sidebar/panels/tokens-panel-view.js';

export default SideBarView.extend({

	//
	// attributes
	//

	panels: ['tokens'],

	//
	// querying methods
	//

	hasSelected: function() {
		switch (this.category) {
			case 'tokens':
				return this.hasChildView('tokens') && this.getChildView('tokens').hasSelected();
		}
	},

	//
	// getting methods
	//

	getSelected: function() {
		switch (this.category) {
			case 'tokens':
				return this.getChildView('tokens').getSelected();
		}
	},

	//
	// setting methods
	//

	setSelectedIndex: function(index) {
		switch (this.category) {
			case 'tokens':
				this.getChildView('tokens').setSelectedIndex(index);
				break;
		}
	},

	setSelected: function(name, category) {
		let selectedView;

		switch (category) {
			case 'tokens':
				this.getChildView('tokens').deselectAll();
				selectedView = this.getChildView('tokens').selectByName(name);
				break;
		}

		if (selectedView) {
			this.scrollToView(selectedView);
		}
	},

	//
	// panel rendering methods
	//

	showPanel: function(panel) {

		// show specified panel
		//
		switch (panel) {
			case 'tokens':
				this.showTokensPanel();
				break;
		}
	},

	showTokensPanel: function() {
		this.showChildView('tokens', new TokensPanelView({
			collection: this.collection,

			// options
			//
			view_kind: this.options.view_kind,
			selected: this.options.selected,

			// callbacks
			//
			onselect: this.options.onselect
		}));
	}
});