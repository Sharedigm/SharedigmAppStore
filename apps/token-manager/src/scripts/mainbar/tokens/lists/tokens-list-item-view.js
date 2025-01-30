/******************************************************************************\
|                                                                              |
|                           tokens-list-item-view.js                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a token icon and name.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ListItemView from '../../../../../../views/items/lists/list-item-view.js';

export default ListItemView.extend({


	//
	// attributes
	//

	template: template(`
		<div class="info">
		
			<div class="small icon tile">
				<image src="<%= icon %>" />
			</div>
			
			<span class="name" spellcheck="false"><%= name %></span>
		</div>
	`),

	//
	// getting methods
	//

	getIcon: function() {
		return 'images/icons/apps/token-manager.svg';
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			icon: this.getIcon(),
			name: this.model.get('name')
		};
	}
});