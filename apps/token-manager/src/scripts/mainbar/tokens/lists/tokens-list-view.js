/******************************************************************************\
|                                                                              |
|                              tokens-list-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a list of tokens.                              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ListView from '../../../../../../views/items/lists/list-view.js';
import TokensListItemView from '../../../../../../views/apps/token-manager/mainbar/tokens/lists/tokens-list-item-view.js';

export default ListView.extend({

	//
	// attributes
	//

	editable: false,

	// views
	//
	childView: TokensListItemView
});