/******************************************************************************\
|                                                                              |
|                              token-card-view.js                              |
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

import CardView from '../../../../../../views/items/cards/card-view.js';

export default CardView.extend({


	//
	// attributes
	//

	template: template(`
		<div class="card">
			<div class="icon">
				<image src="<%= icon %>" />
			</div>
		
			<div class="info">
				<div class="row">
					<div class="name"><%= name %></div>
				</div>
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