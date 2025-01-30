/******************************************************************************\
|                                                                              |
|                             token-icons-view.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a grid of token icons.                         |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import IconsView from '../../../../../../views/items/icons/icons-view.js';
import TokenIconView from '../../../../../../views/apps/token-manager/mainbar/tokens/icons/token-icon-view.js';

export default IconsView.extend({

	//
	// attributes
	//

	className: 'settings icon-grid',

	template: template(`
		<svg class="defs">
			<defs></defs>
		</svg>
		<div class="icons"></div>
	`),

	childView: TokenIconView,
	childViewContainer: '.icons',

	//
	// querying methods
	//

	contains: function(array, model) {
		let name = model.get('name');
		for (let i = 0; i < array.length; i++) {
			if (array[i].get('name') == name) {
				return true;
			}
		}
		return false;
	},

	//
	// rendering methods
	//

	childViewOptions: function(model) {
		return _.extend({}, this.options, {
			model: model,

			// options
			//
			selected: this.options.selected && this.contains(this.options.selected, model)
		});
	}
});