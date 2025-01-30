/******************************************************************************\
|                                                                              |
|                              token-icon-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a token icon.                                  |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import IconView from '../../../../../../views/items/icons/icon-view.js';

export default IconView.extend({

	//
	// attributes
	//

	template: template(`
		<div class="row">
			<div class="icon">
				<image src="<%= icon %>" />
			</div>
		</div>
		
		<div class="row">
			<div class="name" spellcheck="false"><%= name %></div>
		</div>
	`),

	// prevent editing of app names
	//
	editable: false,

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