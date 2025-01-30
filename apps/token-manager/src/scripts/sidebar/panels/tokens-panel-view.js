/******************************************************************************\
|                                                                              |
|                              tokens-panel-view.js                            |
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

import SideBarPanelView from '../../../../../views/apps/common/sidebar/panels/sidebar-panel-view.js';
import TokensView from '../../../../../views/apps/token-manager/mainbar/tokens/tokens-view.js';

export default SideBarPanelView.extend({

	//
	// attributes
	//

	className: 'tokens panel',

	template: template(`
		<div class="header">
			<label><i class="fa fa-coins"></i>Tokens</label>
		</div>
		
		<div class="items"></div>
	`),

	regions: {
		'items': '.items'
	},

	//
	// rendering methods
	//

	onRender: function() {

		// show child views
		//
		this.showItems();
	},

	showItems: function() {
		this.showChildView('items', new TokensView({
			collection: this.collection,

			// options
			//
			view_kind: this.options.view_kind,
			selected: this.options.selected,

			// capabilities
			//
			deselectable: false,

			// callbacks
			//
			onselect: this.options.onselect
		}));		
	}
});